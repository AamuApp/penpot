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

(def schema:aamuapp
  [:map {:title "Token"}
   [:token :string]
   [:error :string]])

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

(s/def ::get-aamuapp-token
  (s/keys :req-un [::id ::secret]))

(s/def ::get-aamuapp-profile
  (s/keys :req-un [::id ::secret]))

(sv/defmethod ::get-aamuapp-token
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result schema:aamuapp}
  [{:keys [::db/pool] :as cfg} {:keys [id secret]}]
  (l/info :hint "get-aamuapp-token" :id id :secret secret)
  (let [created-at  (dt/now)
        cfsecret    (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (-> (gen-token id created-at cfg)
          (wrap-token)
          (log-the-user-in cfg id created-at))
      {:error "Key not found."})))

(sv/defmethod ::get-aamuapp-profile
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result schema:aamuapp}
  [{:keys [::db/pool] :as cfg} {:keys [id secret]}]
  (l/info :hint "get-aamuapp-profile" :id id :secret secret)
  (let [created-at  (dt/now)
        cfsecret    (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (let [profile (profile/get-profile cfg id)]
        (println "Profile data:" profile)
        profile)
      {:error "Key not found."})))

(defn transform-cfg-to-conn [cfg]
  {:db/pool (:app.db/pool cfg)})

(defn get-pool [conn]
  (if (and (map? conn) (:db/pool conn))
    (:db/pool conn)
    conn))

(sv/defmethod ::get-aamuapp-team
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result schema:aamuapp}
  [{:keys [::db/pool] :as cfg} {:keys [id team-id secret]}]
  (l/info :hint "get-aamuapp-team" :id id :team-id team-id :secret secret)
  (let [created-at (dt/now)
        cfsecret   (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (let [team (team/get-team (get-pool (transform-cfg-to-conn cfg)) :team-id (uuid/uuid team-id) :profile-id (uuid/uuid id))]
        (println "team data:" team)
        team)
      {:error "Key not found."})))
