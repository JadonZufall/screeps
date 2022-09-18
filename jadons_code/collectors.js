/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('collectors');
 * mod.thing == 'a thing'; // true
 */
 

module.exports = {
    run: function(targetCreep) {
        if (targetCreep.store.getFreeCapacity() == 0) {
            targetCreep.memory["emptyStore"] = false;
        }
        if (targetCreep.store.getUsedCapacity() == 0) {
            targetCreep.memory["emptyStore"] = true;
        }
        if (targetCreep.memory["emptyStore"]) {
            var target = targetCreep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            var pickupResult = targetCreep.pickup(target);
            if (pickupResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(target);
            }
        }
        else {
            var transferTargets = targetCreep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
            var unfullTargets = [];
            for (var index in transferTargets) {
                if (transferTargets[index].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    unfullTargets.push(transferTargets[index]);
                }
            }
            
            if (unfullTargets.length) {
                var transferResult = targetCreep.transfer(unfullTargets[0], RESOURCE_ENERGY);
                if (transferResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(unfullTargets[0]);
                }
            }
            else {
                var transferResult = targetCreep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY);
                if (transferResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(Game.spawns["Spawn1"]);
                }
            }
        }
    }
};