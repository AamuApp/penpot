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
   [app.common.time :as ct]
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
  (try
    (rph/with-transform result (session/create-fn2 cfg (:token result) id created-at))
    (catch Exception e
      (l/error e "Failed to create session")
      {:error "Session creation failed"})))

(s/def ::id ::us/uuid)
(s/def ::secret string?)

(s/def ::get-aamuapp-token
  (s/keys :req-un [::id ::secret]))

;; Updated schema to standardize error messages and allow flexibility for future fields
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
  (let [created-at (ct/now)
        cfsecret   (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (let [token (-> (gen-token id created-at cfg)
                      (wrap-token))]
        (l/info :hint "get-aamuapp-token: token generated" :id id)
        (log-the-user-in token cfg id created-at))
      (do
        (l/warn :hint "Secret check failed" :id id)
        {:error "Invalid secret key"}))))

;; Define schemas for profile and team to ensure consistent response shapes
(def schema:profile
  [:map
   [:id :uuid]
   [:name :string]]) ; Adjust fields based on profile/get-profile return value

(def schema:team
  [:map
   [:team-id :uuid]
   [:profile-id :uuid]]) ; Adjust fields based on team/get-team return value

(sv/defmethod ::get-aamuapp-profile
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result [:map [:profile {:optional true} schema:profile] [:error {:optional true} :string]]} ; Updated result schema
  [{:keys [::db/pool] :as cfg} {:keys [id secret]}]
  (l/info :hint "get-aamuapp-profile" :id id)
  (let [cfsecret (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (try
        (let [uuid-id (uuid/uuid id)
              profile (profile/get-profile (get-pool (transform-cfg-to-conn cfg)) uuid-id)]
          (l/info :hint "Profile fetched" :id id) ; Replaced println with proper logging
          {:profile profile})
        (catch IllegalArgumentException e
          (l/warn :hint "Invalid UUID" :id id)
          {:error "Invalid UUID format"})
        (catch Exception e
          (l/error e "Error fetching profile")
          {:error "Profile not found or database error"}))
      (do
        (l/warn :hint "Secret check failed" :id id)
        {:error "Invalid secret key"}))))

(sv/defmethod ::get-aamuapp-team
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result [:map [:team {:optional true} schema:team] [:error {:optional true} :string]]} ; Updated result schema
  [{:keys [::db/pool] :as cfg} {:keys [id team-id secret]}]
  (l/info :hint "get-aamuapp-team" :id id :team-id team-id)
  (let [cfsecret (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
      (try
        (if (and team-id id)
          (let [uuid-id (uuid/uuid id)
                uuid-team-id (uuid/uuid team-id)
                team (team/get-team 
                       (get-pool (transform-cfg-to-conn cfg))
                       :team-id uuid-team-id 
                       :profile-id uuid-id)]
            (l/info :hint "Team fetched" :id id :team-id team-id) ; Replaced println with proper logging
            {:team team})
          {:error "Missing required parameters: id and team-id"})
        (catch IllegalArgumentException e
          (l/warn :hint "Invalid UUID" :id id :team-id team-id)
          {:error "Invalid UUID format"})
        (catch Exception e
          (l/error e "Error fetching team")
          {:error "Team not found or database error"}))
      (do
        (l/warn :hint "Secret check failed" :id id :team-id team-id)
        {:error "Invalid secret key"}))))
