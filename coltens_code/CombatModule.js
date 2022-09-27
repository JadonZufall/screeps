/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CombatModule');
 * mod.thing == 'a thing'; // true
 */
const utils = require("utils");
const combatUtils = require("combatUtils");

module.exports = {
    melee: function(targetCreep) {
        if (combatUtils.attackNearestCreep(targetCreep)) {
            return 0;
        }
        else if (combatUtils.attackNearestStructure(targetCreep)) {
            return 0;
        }
        else if (utils.toRoom(targetCreep)) {
            return 0;
        }
        else if (!targetCreep.room.controller.my) {
            let reserveResult = targetCreep.attackController(targetCreep.room.controller);
            if (reserveResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(targetCreep.room.controller);
                return 1;
            } else if (!reserveResult) {
                return 1;
            }
            else if (reserveResult == ERR_GCL_NOT_ENOUGH || reserveResult == ERR_INVALID_TARGET) {
                targetCreep.suicide();
            }
        }
        else {
            targetCreep.say("idle");
        }
    }
};