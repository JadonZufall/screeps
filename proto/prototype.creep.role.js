const CONFIG = require("config");

module.exports = function() {
    Creep.prototype.runRole = function() {
        var creepRole = this.getRole();
        if (creepRole == CONFIG.CREEP_ROLES.NO_ROLE) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.DEFAULT) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.WORKER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.BUILDER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.UPGRADER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.MINER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.CLAIMER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.BALANCER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.HAULER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.PORTER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.CLEANER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.HEALER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.FIGHTER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.RANGER) {

        }
        else if (creepRole == CONFIG.CREEP_ROLES.DEFENDER) {

        }
        else {
            
        }
    };
}