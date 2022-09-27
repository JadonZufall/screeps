/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('UrbanModule');
 * mod.thing == 'a thing'; // true
 */
const civilianUtils = require("civilianUtils");
const utils = require("utils");
const urbanUtils = require("urbanUtils");

module.exports = {
    hauler: function (targetCreep) {
        if (civilianUtils.hideUtil(targetCreep)) {
            return 0;
        }
        if (civilianUtils.workerRenewUtil(targetCreep)) {
            return 0;
        }
        if (utils.toRoom(targetCreep)) {
            return 0;
        }
        if (civilianUtils.scavengeUtil(targetCreep)) {
            return 0;
        }
        if (urbanUtils.urbanHauler(targetCreep)) {
            return 0;
        }
    },
    
    harvester: function (targetCreep) {
        if (civilianUtils.hideUtil(targetCreep)) {
            return 0;
        }
        if (civilianUtils.workerRenewUtil(targetCreep)) {
            return 0;
        }
        if (utils.toRoom(targetCreep)) {
            return 0;
        }
        if (urbanUtils.urbanHarvester(targetCreep)) {
            return 0;
        }
    }
};