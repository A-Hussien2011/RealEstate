import {Role} from "./Role";
import {currentRoles} from "./index";

export class check {

    static if = function (user) {
        user = user.toLowerCase();
        let role = currentRoles[user];
        if (!role) role = new Role();

        function checkValidEndPoint(endpoint, verb) {
            if (verb) {
                return verb.containsEndpoint(endpoint);
            } else {
                return {isValid: false, params: {}};
            }
        }

        let checkRequestValidity = function(endpoint) {
            let verb = this.verb;
            let checker = checkValidEndPoint(endpoint, verb);
            return {
                isValid: checker.isValid,
                when: function (obj) {
                    if (!checker.isValid) return false;
                    else return checker.condition.currentCondition(checker.params, obj);
                }
            }
        };

        return {
            can: function (verb) {
                this.verb = role.verbs[verb];
                return this
            },
            to: checkRequestValidity,
            from: checkRequestValidity
        }
    };
}