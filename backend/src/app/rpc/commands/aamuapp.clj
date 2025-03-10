(ns app.rpc.commands.aamuapp
  (:require
   [app.auth :as auth]
   [app.common.data :as d]
   [app.common.data.macros :as dm]
   [app.common.logging :as l]
   [app.common.schema :as sm]
   [app.common.spec :as us]
   [app.common.uuid :as uuid]
   [app.config :as cf]
   [app.db :as db]
   [app.http.session :as session]
   [app.main :as-alias main]
   [app.rpc :as-alias rpc]
   [app.rpc.commands.profile :as profile]
   [app.rpc.commands.teams :as team]
   [app.rpc.doc :as-alias doc]
   [app.rpc.helpers :as rph]
   [app.tokens :as tokens]
   [app.util.services :as sv]
   [app.util.time :as dt]
   [clojure.spec.alpha :as s]
   [cuerdas.core :as str]))

(defn transform-cfg-to-conn [cfg]
  {:db/pool (:app.db/pool cfg)})

(defn get-pool [conn]
  (if (and (map? conn) (:db/pool conn))
    (:db/pool conn)
    conn))

(defn- wrap-token
  [token]
  {:token token})

(defn- gen-token
  [id created-at {:keys [:app.setup/props] :as props}]
  (tokens/generate props {:iss "authentication"
                          :iat created-at
                          :uid id}))

(defn- log-the-user-in
  [result cfg id created-at]
  (rph/with-transform result (session/create-fn2 cfg (:token result) id created-at)))

(s/def ::id ::us/uuid)
(s/def ::secret string?)  ;; Fixed: Use string? instead of :string

(s/def ::get-aamuapp-token
  (s/keys :req-un [::id ::secret]))

(def schema:aamuapp
  [:map {:title "Token"}
   [:token {:optional true} :string]
   [:error {:optional true} :string]])

(sv/defmethod ::get-aamuapp-token
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result schema:aamuapp}
  [{:keys [::db/pool] :as cfg} {:keys [id secret]}]
  (l/info :hint "get-aamuapp-token" :id id)
  (let [created-at (dt/now)
        cfsecret   (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (let [token (-> (gen-token id created-at cfg)
                      (wrap-token))]
        (l/info :hint "Token generated" :token token)
        (log-the-user-in token cfg id created-at))
      (do
        (l/warn :hint "Secret check failed" :cfsecret cfsecret :secret secret)
        {:error "Invalid or missing secret key."}))))

(sv/defmethod ::get-aamuapp-profile
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result schema:aamuapp}
  [{:keys [::db/pool] :as cfg} {:keys [id secret]}]
  (l/info :hint "get-aamuapp-profile" :id id)
  (let [cfsecret (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (if (nil? id)
        {:error "Missing required parameter: id"}
        (try
          (let [profile (profile/get-profile (get-pool (transform-cfg-to-conn cfg)) (uuid/uuid id))]
            (println "Profile data:" profile)
            profile)
          (catch Exception e
            (l/error e "Error fetching profile")
            {:error "Profile not found or database error"})))
      {:error "Key not found."})))

(sv/defmethod ::get-aamuapp-team
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result schema:aamuapp}
  [{:keys [::db/pool] :as cfg} {:keys [id team-id secret]}]
  (l/info :hint "get-aamuapp-team" :id id :team-id team-id)
  (let [created-at (dt/now)
        cfsecret   (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (try
        (if (and team-id id)
          (let [team (team/get-team 
                       (get-pool (transform-cfg-to-conn cfg))
                       :team-id (uuid/uuid team-id) 
                       :profile-id (uuid/uuid id))]
            (println "team data:" team)
            team)
          {:error "Missing required parameters: id and team-id."})
        (catch Exception e
          (l/error e "Error fetching team")
          {:error "Team not found or database error"}))
      {:error "Key not found."})))
