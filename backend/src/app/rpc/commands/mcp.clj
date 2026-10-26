;; This Source Code Form is subject to the terms of the Mozilla Public
;; License, v. 2.0. If a copy of the MPL was not distributed with this
;; file, You can obtain one at http://mozilla.org/MPL/2.0/.
;;
;; Copyright (c) KALEIDOS INC

(ns app.rpc.commands.mcp
  (:require
   [app.common.exceptions :as ex]
   [app.common.schema :as sm]
   [app.common.time :as ct]
   [app.common.uri :as u]
   [app.common.uuid :as uuid]
   [app.config :as cf]
   [app.http :as-alias http]
   [app.rpc :as-alias rpc]
   [app.rpc.doc :as-alias doc]
   [app.rpc.helpers :as rph]
   [app.tokens :as tokens]
   [app.util.services :as sv]
   [cuerdas.core :as str]
   [yetti.request :as yreq])
  (:import
   java.util.UUID))

(def ^:private ws-token-ttl
  (ct/duration {:minutes 2}))

(def ^:private schema:create-mcp-session
  [:map {:title "create-mcp-session"}
   [:file-id {:optional true} ::sm/uuid]
   [:page-id {:optional true} ::sm/uuid]
   [:ttl-days {:optional true} [:int {:min 1}]]
   [:non-expiring {:optional true} :boolean]])

(def ^:private schema:verify-mcp-session
  [:map {:title "verify-mcp-session"}
   [:token [:string {:max 6000}]]])

(def ^:private schema:mcp-session-response
  [:map
   [:session-id :uuid]
   [:tenant :string]
   [:mcp-url :string]
   [:ws-url :string]
   [:client-token :string]
   [:ws-token :string]
   [:expires-at {:optional true} inst?]])

(def ^:private schema:mcp-session-claims
  [:map
   [:valid :boolean]
   [:subject [:enum "client" "plugin"]]
   [:session-id :uuid]
   [:profile-id :uuid]
   [:tenant :string]
   [:file-id {:optional true} :uuid]
   [:page-id {:optional true} :uuid]
   [:expires-at {:optional true} inst?]])

(defn- get-request-host
  [request]
  (or (some-> (cf/get :public-uri)
              u/uri
              :host)
      (some-> (yreq/get-header request "x-forwarded-host")
              (str/split ",")
              first
              str/trim
              not-empty)
      (some-> (yreq/get-header request "host")
              str/trim
              not-empty)
      (some-> (cf/get :public-uri)
              u/uri
              :host)))

(defn- get-request-scheme
  [request]
  (or (some-> (cf/get :public-uri)
              u/uri
              :scheme)
      (some-> (yreq/get-header request "x-forwarded-proto")
              (str/split ",")
              first
              str/trim
              not-empty)
      (some-> (yreq/get-header request "x-scheme")
              (str/split ",")
              first
              str/trim
              not-empty)
      (some-> (yreq/get-header request "origin")
              u/uri
              :scheme)
      (some-> (yreq/get-header request "referer")
              u/uri
              :scheme)
      "https"))

(defn- get-request-base-path
  [request]
  (or (some-> (cf/get :public-uri)
              u/uri
              :path
              not-empty
              (str/replace #"/$" ""))
      (let [uri (or (:uri request) "")]
        (or (some->> (re-find #"^(.*)/api(?:/.*)?$" uri)
                     second
                     not-empty)
            ""))))

(defn- join-public-url
  [request path]
  (let [host (get-request-host request)
        scheme (get-request-scheme request)]
    (if (and host scheme)
      (str scheme "://" host path)
      (u/join (cf/get :public-uri) path))))

(defn- stable-session-id
  [profile-id tenant file-id page-id]
  (let [session-key (str "mcp-session|"
                         profile-id "|"
                         tenant "|"
                         (or file-id "-") "|"
                         (or page-id "-"))]
    (UUID/nameUUIDFromBytes (.getBytes session-key "UTF-8"))))

(defn- create-session-token
  [cfg claims ttl]
  (let [now (ct/now)]
    (tokens/generate cfg
                     (cond-> (assoc claims :iat now)
                       ttl (assoc :exp (ct/plus now ttl))))))

(defn- extract-claims
  [cfg token valid-subjects]
  (let [claims (tokens/verify cfg {:token token :iss "mcp-session"})]
    (when-not (= "penpot-mcp" (:aud claims))
      (ex/raise :type :validation
                :code :invalid-token
                :reason :invalid-audience))
    (when-not (contains? valid-subjects (:sub claims))
      (ex/raise :type :validation
                :code :invalid-token
                :reason :invalid-subject))
    claims))

(defn- build-session-response
  [cfg request {:keys [sid uid tenant file-id page-id ttl]}]
  (let [base-path (get-request-base-path request)
        base-claims {:iss "mcp-session"
                     :aud "penpot-mcp"
                     :sid sid
                     :uid uid
                     :tenant tenant
                     :file-id file-id
                     :page-id page-id}
        expires-at (when ttl
                     (ct/plus (ct/now) ttl))]
    (cond-> {:session-id sid
             :tenant tenant
             :mcp-url (join-public-url request (str base-path "/mcp"))
             :ws-url (join-public-url request (str base-path "/mcp-plugin/ws"))
             :client-token (create-session-token cfg (assoc base-claims :sub "client") ttl)
             :ws-token (create-session-token cfg (assoc base-claims :sub "plugin") ws-token-ttl)}
      expires-at (assoc :expires-at expires-at))))

(sv/defmethod ::create-mcp-session
  {::doc/added "2.7"
   ::sm/params schema:create-mcp-session
   ::sm/result schema:mcp-session-response}
  [cfg {:keys [::rpc/profile-id file-id page-id ttl-days non-expiring] :as params}]
  (when-not (uuid? profile-id)
    (ex/raise :type :authentication
              :code :unauthorized))

  (let [request (rph/get-request params)
        tenant (str (get-request-host request))
        session-id (stable-session-id profile-id tenant file-id page-id)
        ttl (when-not non-expiring
              (ct/duration {:days (or ttl-days 1)}))
        session-claims {:sid session-id
                        :uid profile-id
                        :tenant tenant
                        :file-id file-id
                        :page-id page-id
                        :ttl ttl}]
    (build-session-response cfg request session-claims)))

(sv/defmethod ::verify-mcp-session
  {::rpc/auth false
   ::doc/added "2.7"
   ::sm/params schema:verify-mcp-session
   ::sm/result schema:mcp-session-claims}
  [cfg {:keys [token]}]
  (let [claims (extract-claims cfg token #{"client" "plugin"})]
    {:valid true
     :subject (:sub claims)
     :session-id (:sid claims)
     :profile-id (:uid claims)
     :tenant (:tenant claims)
     :file-id (:file-id claims)
     :page-id (:page-id claims)
     :expires-at (:exp claims)}))
