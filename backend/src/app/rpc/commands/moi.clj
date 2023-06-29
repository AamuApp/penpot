(ns app.rpc.commands.moi
  (:require
   [app.auth :as auth]
   [app.common.data :as d]
   [app.common.data.macros :as dm]
   [app.common.schema :as sm]
   [app.common.spec :as us]
   [app.common.uuid :as uuid]
   [app.config :as cf]
   [app.db :as db]
   [app.http.session :as session]
   [app.common.logging :as l]
   [app.main :as-alias main]
   [app.rpc :as-alias rpc]
   [app.rpc.doc :as-alias doc]
   [app.rpc.helpers :as rph]
   [app.tokens :as tokens]
   [app.util.services :as sv]
   [app.util.time :as dt]
   [clojure.spec.alpha :as s]
   [cuerdas.core :as str]))

(def schema:moi
  [:map {:title "Token"}
   [:token :string]
   [:error :string]
  ])

(defn decode-row
  [{:keys [props] :as row}]
  (cond-> row
    (db/pgobject? props "jsonb")
    (assoc :props (db/decode-transit-pgobject props))))

(defn get-profile
  "Get profile by id. Throws not-found exception if no profile found."
  [conn id & {:as attrs}]
  (-> (db/get-by-id conn :profile id attrs)
      (decode-row)))

(defn- create-result
  [token]
  {:token token})

(defn- gen-token
  [id created-at {:keys [::main/props] :as props}]
  (tokens/generate props {:iss "authentication"
                          :iat created-at
                          :uid id}))

(defn- log-the-user-in
  [result cfg id created-at]
  (rph/with-transform result (session/create-fn2 cfg (:token result) id created-at)))

(s/def ::id ::us/uuid)

(s/def ::get-moi
  (s/keys :req-un [::id ::secret]))

(sv/defmethod ::get-moi
  {::rpc/auth false
   ::doc/added "1.18"
   ::sm/result schema:moi}
  [{:keys [::db/pool] :as cfg} {:keys [id secret]}]
  (let [created-at  (dt/now)
        cfsecret    (cf/get :secret-key2)]
    (if (and (some? cfsecret) (not-empty cfsecret) (= secret cfsecret))
        (-> (gen-token id created-at cfg)
            (create-result)
            (log-the-user-in cfg id created-at))
      {:error "Key not found."})))
