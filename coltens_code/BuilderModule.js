/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BuilderModule');
 * mod.thing == 'a thing'; // true
 */

const utils = require("utils");
const civilianUtils = require("civilianUtils");

module.exports = {
    run: function(targetCreep) {
        var thisRoom = targetCreep.room;
        
        if (civilianUtils.hideUtil(targetCreep)) {
            return 0;
        }
        
        if (targetCreep.ticksToLive < 300) {
            targetCreep.memory["imDying"] = true;
        }
        if (targetCreep.ticksToLive > 1400) {
            targetCreep.memory["imDying"] = false;
        }
        
        var thisRoomsSpawns = thisRoom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
        var closestSpawn = targetCreep.pos.findClosestByPath(thisRoomsSpawns);
        
        if (targetCreep.memory["imDying"] == true) {
            var renewResult = thisRoomsSpawns[0].renewCreep(targetCreep);
            if (renewResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(thisRoomsSpawns[0]);
            }
            return 0;
        }
        
        var upkeepResult = civilianUtils.controllerUpkeepUtil(targetCreep);
        
        if (upkeepResult == 1) {
            return 0;
        }
        else if (upkeepResult == 0) {
            utils.withdrawEnergy(targetCreep);
            return 0;
        }
        
        var buildResult = civilianUtils.buildUtil(targetCreep);
        
        if (buildResult == 1) {
            return 0;
        }
        else if (buildResult == 0) {
            utils.withdrawEnergy(targetCreep);
            return 0;
        }
        
        var upgradeResult = civilianUtils.controllerUpgradeUtil(targetCreep);
        
        if (upgradeResult == 1) {
            return 0;
        }
        else if (upgradeResult == 0) {
            utils.withdrawEnergy(targetCreep);
            return 0;
        }
    }
};