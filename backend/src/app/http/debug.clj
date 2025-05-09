;; This Source Code Form is subject to the terms of the Mozilla Public
;; License, v. 2.0. If a copy of the MPL was not distributed with this
;; file, You can obtain one at http://mozilla.org/MPL/2.0/.
;;
;; Copyright (c) KALEIDOS INC

(ns app.http.debug
  (:refer-clojure :exclude [error-handler])
  (:require
   [app.binfile.common :as bfc]
   [app.binfile.v1 :as bf.v1]
   [app.binfile.v3 :as bf.v3]
   [app.common.data :as d]
   [app.common.exceptions :as ex]
   [app.common.features :as cfeat]
   [app.common.logging :as l]
   [app.common.pprint :as pp]
   [app.common.uuid :as uuid]
   [app.config :as cf]
   [app.db :as db]
   [app.http.session :as session]
   [app.rpc.commands.auth :as auth]
   [app.rpc.commands.files-create :refer [create-file]]
   [app.rpc.commands.profile :as profile]
   [app.rpc.commands.teams :as teams]
   [app.setup :as-alias setup]
   [app.srepl.main :as srepl]
   [app.storage :as-alias sto]
   [app.storage.tmp :as tmp]
   [app.util.blob :as blob]
   [app.util.template :as tmpl]
   [app.util.time :as dt]
   [cuerdas.core :as str]
   [datoteka.io :as io]
   [emoji.core :as emj]
   [integrant.core :as ig]
   [markdown.core :as md]
   [markdown.transformers :as mdt]
   [yetti.request :as yreq]
   [yetti.response :as yres]))

;; (selmer.parser/cache-off!)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; INDEX
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn index-handler
  [_cfg _request]
  {::yres/status  200
   ::yres/headers {"content-type" "text/html"}
   ::yres/body    (-> (io/resource "app/templates/debug.tmpl")
                      (tmpl/render {:version (:full cf/version)}))})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; FILE CHANGES
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn prepare-response
  [body]
  (let [headers {"content-type" "application/transit+json"}]
    {::yres/status 200
     ::yres/body body
     ::yres/headers headers}))

(defn prepare-download-response
  [body filename]
  (let [headers {"content-disposition" (str "attachment; filename=" filename)
                 "content-type" "application/octet-stream"}]
    {::yres/status 200
     ::yres/body body
     ::yres/headers headers}))

(def sql:retrieve-range-of-changes
  "select revn, changes from file_change where file_id=? and revn >= ? and revn <= ? order by revn")

(def sql:retrieve-single-change
  "select revn, changes, data from file_change where file_id=? and revn = ?")

(defn- retrieve-file-data
  [{:keys [::db/pool]} {:keys [params ::session/profile-id] :as request}]
  (let [file-id  (some-> params :file-id parse-uuid)
        revn     (some-> params :revn parse-long)
        filename (str file-id)]

    (when-not file-id
      (ex/raise :type :validation
                :code :missing-arguments))

    (let [data (if (integer? revn)
                 (some-> (db/exec-one! pool [sql:retrieve-single-change file-id revn]) :data)
                 (some-> (db/get-by-id pool :file file-id) :data))]

      (when-not data
        (ex/raise :type :not-found
                  :code :enpty-data
                  :hint "empty response"))
      (cond
        (contains? params :download)
        (prepare-download-response data filename)

        (contains? params :clone)
        (let [profile    (profile/get-profile pool profile-id)
              project-id (:default-project-id profile)]

          (db/run! pool (fn [{:keys [::db/conn] :as cfg}]
                          (create-file cfg {:id file-id
                                            :name (str "Cloned file: " filename)
                                            :project-id project-id
                                            :profile-id profile-id})
                          (db/update! conn :file
                                      {:data data}
                                      {:id file-id})
                          {::yres/status 201
                           ::yres/body "OK CREATED"})))

        :else
        (prepare-response (blob/decode data))))))

(defn- is-file-exists?
  [pool id]
  (let [sql "select exists (select 1 from file where id=?) as exists;"]
    (-> (db/exec-one! pool [sql id]) :exists)))

(defn- upload-file-data
  [{:keys [::db/pool]} {:keys [::session/profile-id params] :as request}]
  (let [profile    (profile/get-profile pool profile-id)
        project-id (:default-project-id profile)
        data       (some-> params :file :path io/read*)]

    (if (and data project-id)
      (let [fname     (str "Imported file *: " (dt/now))
            reuse-id? (contains? params :reuseid)
            file-id   (or (and reuse-id? (ex/ignoring (-> params :file :filename parse-uuid)))
                          (uuid/next))]

        (if (and reuse-id? file-id
                 (is-file-exists? pool file-id))
          (do
            (db/update! pool :file
                        {:data data
                         :deleted-at nil}
                        {:id file-id})
            {::yres/status 200
             ::yres/body "OK UPDATED"})

          (db/run! pool (fn [{:keys [::db/conn] :as cfg}]
                          (create-file cfg {:id file-id
                                            :name fname
                                            :project-id project-id
                                            :profile-id profile-id})
                          (db/update! conn :file
                                      {:data data}
                                      {:id file-id})
                          {::yres/status 201
                           ::yres/body "OK CREATED"}))))

      {::yres/status 500
       ::yres/body "ERROR"})))

(defn file-data-handler
  [cfg request]
  (case (yreq/method request)
    :get (retrieve-file-data cfg request)
    :post (upload-file-data cfg request)
    (ex/raise :type :http
              :code :method-not-found)))

(defn file-changes-handler
  [{:keys [::db/pool]} {:keys [params] :as request}]
  (letfn [(retrieve-changes [file-id revn]
            (if (str/includes? revn ":")
              (let [[start end] (->> (str/split revn #":")
                                     (map str/trim)
                                     (map parse-long))]
                (some->> (db/exec! pool [sql:retrieve-range-of-changes file-id start end])
                         (map :changes)
                         (map blob/decode)
                         (mapcat identity)
                         (vec)))

              (if-let [revn (parse-long revn)]
                (let [item (db/exec-one! pool [sql:retrieve-single-change file-id revn])]
                  (some-> item :changes blob/decode vec))
                (ex/raise :type :validation :code :invalid-arguments))))]

    (let [file-id  (some-> params :id parse-uuid)
          revn     (or (some-> params :revn parse-long) "latest")
          filename (str file-id)]

      (when (or (not file-id) (not revn))
        (ex/raise :type :validation
                  :code :invalid-arguments
                  :hint "missing arguments"))

      (let [data (retrieve-changes file-id revn)]
        (if (contains? params :download)
          (prepare-download-response data filename)
          (prepare-response data))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; ERROR BROWSER
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn error-handler
  [{:keys [::db/pool]} request]
  (letfn [(get-report [{:keys [path-params]}]
            (ex/ignoring
             (let [report-id (some-> path-params :id parse-uuid)]
               (some-> (db/get-by-id pool :server-error-report report-id)
                       (update :content db/decode-transit-pgobject)))))

          (render-template-v1 [{:keys [content]}]
            (let [context (dissoc content
                                  :trace :cause :params :data :spec-problems :message
                                  :spec-explain :spec-value :error :explain :hint)
                  params  {:context       (pp/pprint-str context :width 200)
                           :hint          (:hint content)
                           :spec-explain  (:spec-explain content)
                           :spec-problems (:spec-problems content)
                           :spec-value    (:spec-value content)
                           :data          (:data content)
                           :trace         (or (:trace content)
                                              (some-> content :error :trace))
                           :params        (:params content)}]
              (-> (io/resource "app/templates/error-report.tmpl")
                  (tmpl/render params))))

          (render-template-v2 [{report :content}]
            (-> (io/resource "app/templates/error-report.v2.tmpl")
                (tmpl/render report)))

          (render-template-v3 [{:keys [content id created-at]}]
            (-> (io/resource "app/templates/error-report.v3.tmpl")
                (tmpl/render (-> content
                                 (assoc :id id)
                                 (assoc :created-at (dt/format-instant created-at :rfc1123))))))]

    (if-let [report (get-report request)]
      (let [result (case (:version report)
                     1 (render-template-v1 report)
                     2 (render-template-v2 report)
                     3 (render-template-v3 report))]
        {::yres/status 200
         ::yres/body result
         ::yres/headers {"content-type" "text/html; charset=utf-8"
                         "x-robots-tag" "noindex"}})
      {::yres/status 404
       ::yres/body "not found"})))

(def sql:error-reports
  "SELECT id, created_at,
          content->>'~:hint' AS hint
     FROM server_error_report
    ORDER BY created_at DESC
    LIMIT 200")

(defn error-list-handler
  [{:keys [::db/pool]} _request]
  (let [items (->> (db/exec! pool [sql:error-reports])
                   (map #(update % :created-at dt/format-instant :rfc1123)))]
    {::yres/status 200
     ::yres/body (-> (io/resource "app/templates/error-list.tmpl")
                     (tmpl/render {:items items}))
     ::yres/headers {"content-type" "text/html; charset=utf-8"
                     "x-robots-tag" "noindex"}}))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; EXPORT/IMPORT
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn export-handler
  [{:keys [::db/pool] :as cfg} {:keys [params ::session/profile-id] :as request}]

  (let [file-ids (into #{}
                       (comp (remove empty?)
                             (map parse-uuid))
                       (:file-ids params))
        libs?    (contains? params :includelibs)
        clone?   (contains? params :clone)
        embed?   (contains? params :embedassets)]

    (when-not (seq file-ids)
      (ex/raise :type :validation
                :code :missing-arguments))

    (let [path (tmp/tempfile :prefix "penpot.export." :min-age "30m")]
      (with-open [output (io/output-stream path)]
        (-> cfg
            (assoc ::bfc/ids file-ids)
            (assoc ::bfc/embed-assets embed?)
            (assoc ::bfc/include-libraries libs?)
            (bf.v3/export-files! output)))

      (if clone?
        (let [profile    (profile/get-profile pool profile-id)
              project-id (:default-project-id profile)
              cfg        (assoc cfg
                                ::bfc/overwrite false
                                ::bfc/profile-id profile-id
                                ::bfc/project-id project-id
                                ::bfc/input path)]
          (bf.v3/import-files! cfg)
          {::yres/status  200
           ::yres/headers {"content-type" "text/plain"}
           ::yres/body    "OK CLONED"})

        {::yres/status  200
         ::yres/body    (io/input-stream path)
         ::yres/headers {"content-type" "application/octet-stream"
                         "content-disposition" (str "attachmen; filename=" (first file-ids) ".penpot")}}))))


(defn import-handler
  [{:keys [::db/pool] :as cfg} {:keys [params ::session/profile-id] :as request}]
  (when-not (contains? params :file)
    (ex/raise :type :validation
              :code :missing-upload-file
              :hint "missing upload file"))

  (let [profile    (profile/get-profile pool profile-id)
        project-id (:default-project-id profile)
        team       (teams/get-team pool
                                   :profile-id profile-id
                                   :project-id project-id)]

    (when-not project-id
      (ex/raise :type :validation
                :code :missing-project
                :hint "project not found"))

    (let [path   (-> params :file :path)
          format (bfc/parse-file-format path)
          cfg    (assoc cfg
                        ::bfc/profile-id profile-id
                        ::bfc/project-id project-id
                        ::bfc/input path
                        ::bfc/features (cfeat/get-team-enabled-features cf/flags team))]

      (if (= format :binfile-v3)
        (bf.v3/import-files! cfg)
        (bf.v1/import-files! cfg))

      {::yres/status  200
       ::yres/headers {"content-type" "text/plain"}
       ::yres/body    "OK"})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; ACTIONS
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn- resend-email-notification
  [cfg {:keys [params] :as request}]
  (db/tx-run! cfg (fn [{:keys [::db/conn] :as cfg}]
                    (when-not (contains? params :force)
                      (ex/raise :type :validation
                                :code :missing-force
                                :hint "missing force checkbox"))

                    (let [profile (some->> params
                                           :email
                                           (profile/clean-email)
                                           (profile/get-profile-by-email conn))]

                      (when-not profile
                        (ex/raise :type :validation
                                  :code :missing-profile
                                  :hint "unable to find profile by email"))

                      (cond
                        (contains? params :block)
                        (do
                          (db/update! conn :profile {:is-blocked true} {:id (:id profile)})
                          (db/delete! conn :http-session {:profile-id (:id profile)})

                          {::yres/status  200
                           ::yres/headers {"content-type" "text/plain"}
                           ::yres/body    (str/ffmt "PROFILE '%' BLOCKED" (:email profile))})

                        (contains? params :unblock)
                        (do
                          (db/update! conn :profile {:is-blocked false} {:id (:id profile)})
                          {::yres/status  200
                           ::yres/headers {"content-type" "text/plain"}
                           ::yres/body    (str/ffmt "PROFILE '%' UNBLOCKED" (:email profile))})

                        (contains? params :resend)
                        (if (:is-blocked profile)
                          {::yres/status  200
                           ::yres/headers {"content-type" "text/plain"}
                           ::yres/body    "PROFILE ALREADY BLOCKED"}
                          (do
                            (#'auth/send-email-verification! cfg profile)
                            {::yres/status  200
                             ::yres/headers {"content-type" "text/plain"}
                             ::yres/body    (str/ffmt "RESENDED FOR '%'" (:email profile))}))

                        :else
                        (do
                          (db/update! conn :profile {:is-active true} {:id (:id profile)})
                          {::yres/status  200
                           ::yres/headers {"content-type" "text/plain"}
                           ::yres/body    (str/ffmt "PROFILE '%' ACTIVATED" (:email profile))}))))))


(defn- reset-file-version
  [cfg {:keys [params] :as request}]
  (let [file-id (some-> params :file-id d/parse-uuid)
        version (some-> params :version d/parse-integer)]

    (when-not (contains? params :force)
      (ex/raise :type :validation
                :code :missing-force
                :hint "missing force checkbox"))

    (when (nil? file-id)
      (ex/raise :type :validation
                :code :invalid-file-id
                :hint "provided invalid file id"))

    (when (nil? version)
      (ex/raise :type :validation
                :code :invalid-version
                :hint "provided invalid version"))

    (db/tx-run! cfg srepl/process-file! file-id #(assoc % :version version))

    {::yres/status  200
     ::yres/headers {"content-type" "text/plain"}
     ::yres/body    "OK"}))


(defn- add-team-feature
  [{:keys [params] :as request}]
  (let [team-id (some-> params :team-id d/parse-uuid)
        feature (some-> params :feature str)
        skip-check (contains? params :skip-check)]

    (when-not (contains? params :force)
      (ex/raise :type :validation
                :code :missing-force
                :hint "missing force checkbox"))

    (when (nil? team-id)
      (ex/raise :type :validation
                :code :invalid-team-id
                :hint "provided invalid team id"))

    (srepl/enable-team-feature! team-id feature :skip-check skip-check)

    {::yres/status  200
     ::yres/headers {"content-type" "text/plain"}
     ::yres/body    "OK"}))

(defn- remove-team-feature
  [{:keys [params] :as request}]
  (let [team-id   (some-> params :team-id d/parse-uuid)
        feature   (some-> params :feature str)
        skip-check (contains? params :skip-check)]

    (when-not (contains? params :force)
      (ex/raise :type :validation
                :code :missing-force
                :hint "missing force checkbox"))

    (when (nil? team-id)
      (ex/raise :type :validation
                :code :invalid-team-id
                :hint "provided invalid team id"))

    (srepl/disable-team-feature! team-id feature :skip-check skip-check)

    {::yres/status  200
     ::yres/headers {"content-type" "text/plain"}
     ::yres/body    "OK"}))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; OTHER SMALL VIEWS/HANDLERS
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn health-handler
  "Mainly a task that performs a health check."
  [{:keys [::db/pool]} _]
  (try
    (db/exec-one! pool ["select count(*) as count from server_prop;"])
    {::yres/status 200
     ::yres/body "OK"}
    (catch Throwable cause
      (l/warn :hint "unable to execute query on health handler"
              :cause cause)
      {::yres/status 503
       ::yres/body "KO"})))

(defn changelog-handler
  [_ _]
  (letfn [(transform-emoji [text state]
            [(emj/emojify text) state])
          (md->html [text]
            (md/md-to-html-string text :replacement-transformers (into [transform-emoji] mdt/transformer-vector)))]
    (if-let [clog (io/resource "changelog.md")]
      {::yres/status 200
       ::yres/headers {"content-type" "text/html; charset=utf-8"}
       ::yres/body (-> clog slurp md->html)}
      {::yres/status 404
       ::yres/body "NOT FOUND"})))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; INIT
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn authorized?
  [pool {:keys [::session/profile-id]}]
  (or (= "devenv" (cf/get :host))
      (let [profile (ex/ignoring (profile/get-profile pool profile-id))
            admins  (or (cf/get :admins) #{})]
        (contains? admins (:email profile)))))

(def with-authorization
  {:compile
   (fn [& _]
     (fn [handler pool]
       (fn [request]
         (if (authorized? pool request)
           (handler request)
           (ex/raise :type :authentication
                     :code :only-admins-allowed)))))})

(defmethod ig/assert-key ::routes
  [_ params]
  (assert (db/pool? (::db/pool params)) "expected a valid database pool")
  (assert (session/manager? (::session/manager params)) "expected a valid session manager"))

(defmethod ig/init-key ::routes
  [_ {:keys [::db/pool] :as cfg}]
  [["/readyz" {:handler (partial health-handler cfg)}]
   ["/dbg" {:middleware [[session/authz cfg]
                         [with-authorization pool]]}
    ["" {:handler (partial index-handler cfg)}]
    ["/health" {:handler (partial health-handler cfg)}]
    ["/changelog" {:handler (partial changelog-handler cfg)}]
    ["/error/:id" {:handler (partial error-handler cfg)}]
    ["/error" {:handler (partial error-list-handler cfg)}]
    ["/actions/resend-email-verification"
     {:handler (partial resend-email-notification cfg)}]
    ["/actions/reset-file-version"
     {:handler (partial reset-file-version cfg)}]
    ["/actions/add-team-feature"
     {:handler (partial add-team-feature)}]
    ["/actions/remove-team-feature"
     {:handler (partial remove-team-feature)}]
    ["/file/export" {:handler (partial export-handler cfg)}]
    ["/file/import" {:handler (partial import-handler cfg)}]
    ["/file/data" {:handler (partial file-data-handler cfg)}]
    ["/file/changes" {:handler (partial file-changes-handler cfg)}]]])
