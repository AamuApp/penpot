;; This Source Code Form is subject to the terms of the Mozilla Public
;; License, v. 2.0. If a copy of the MPL was not distributed with this
;; file, You can obtain one at http://mozilla.org/MPL/2.0/.
;;
;; Copyright (c) KALEIDOS INC

(ns backend-tests.rpc-aamuapp-test
  (:require
   [app.config :as cf]
   [backend-tests.helpers :as th]
   [clojure.test :as t]
   [mockery.core :refer [with-mocks]]))

(t/use-fixtures :once th/state-init)
(t/use-fixtures :each th/database-reset)

(t/deftest get-aamuapp-team-returns-existing-team-with-shared-secret
  (with-mocks [mock {:target 'app.config/get
                     :return (th/config-get-mock
                              {:secret-key2 "shared-secret"})}]
    (let [owner   (th/create-profile* 1 {:is-active true})
          outsider (th/create-profile* 2 {:is-active true})
          team    (th/create-team* 1 {:profile-id (:id owner)})
          out     (th/command! {::th/type :get-aamuapp-team
                                :id (str (:id outsider))
                                :team-id (str (:id team))
                                :secret "shared-secret"})]
      (t/is (th/success? out))
      (t/is (= (:id team) (get-in out [:result :team :id])))
      (t/is (= (:name team) (get-in out [:result :team :name]))))))

(t/deftest create-team-invitation-with-secret-returns-profile-id-for-existing-member
  (with-mocks [mock {:target 'app.config/get
                     :return (th/config-get-mock
                              {:secret-key2 "shared-secret"})}]
    (with-redefs [cf/flags (disj cf/flags :email-verification)]
      (let [owner  (th/create-profile* 1 {:is-active true})
            member (th/create-profile* 2 {:is-active true})
            team   (th/create-team* 1 {:profile-id (:id owner)})
            out    (th/command! {::th/type :create-team-invitations-with-secret
                                 :profile-id (str (:id owner))
                                 :team-id (str (:id team))
                                 :email (:email member)
                                 :secret "shared-secret"
                                 :role "~:editor"})]
        (t/is (th/success? out))
        (t/is (nil? (get-in out [:result :token])))
        (t/is (= (:id member) (get-in out [:result :profile-id])))))))
