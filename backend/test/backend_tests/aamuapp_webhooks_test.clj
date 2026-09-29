;; This Source Code Form is subject to the terms of the Mozilla Public
;; License, v. 2.0. If a copy of the MPL was not distributed with this
;; file, You can obtain one at http://mozilla.org/MPL/2.0/.
;;
;; Copyright (c) KALEIDOS INC Sucursal en España SL

(ns backend-tests.aamuapp-webhooks-test
  (:require
   [app.loggers.webhooks :as webhooks]
   [clojure.data.json :as json]
   [clojure.test :as t]))

(t/deftest signature-agrees-with-aamu-utf8-test-vector
  (t/is (= "sha256=b915530f49266550e30d28eabf14913d63d9edfb744c78629c261a98114cf27e"
           (webhooks/aamuapp-signature "test-secret" "{\"name\":\"Ääni\"}"))))

(t/deftest aamu-webhooks-bind-and-sign-the-actual-team
  (let [request (webhooks/webhook-request
                 {:name "create-file" :team-id "untrusted" :props {:id "file"}}
                 {:uri "https://team.aamu.app/api/integrations/penpot/events/company"
                  :team-id "actual-team"
                  :mtype "application/json"}
                 "test-secret")
        payload (json/read-str (:body request))]
    (t/is (= "actual-team" (get payload "teamId")))
    (t/is (= "create-file" (get payload "name")))
    (t/is (= (webhooks/aamuapp-signature "test-secret" (:body request))
             (get-in request [:headers "x-penpot-signature"])))))

(t/deftest unrelated-webhooks-keep-their-original-payload
  (let [request (webhooks/webhook-request
                 {:name "create-file" :props {:id "file"}}
                 {:uri "https://example.com/webhook"
                  :team-id "actual-team"
                  :mtype "application/json"}
                 "test-secret")
        payload (json/read-str (:body request))]
    (t/is (nil? (get payload "teamId")))
    (t/is (nil? (get-in request [:headers "x-penpot-signature"])))))
