/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('worker');
 * mod.thing == 'a thing'; // true
 */
 const utils = require("util");

module.exports = {
    run: function(targetCreep) {
        if (!targetCreep.memory["emptyStore"] && targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            // Target creep is out of room to store resource energy.
            targetCreep.memory["emptyStore"] = true;
            targetCreep.say("Empty!");
        }
        if (targetCreep.memory["emptyStore"] && targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            // Target creep has unloaded all of it's resource energy.
            targetCreep.memory["emptyStore"] = false;
            targetCreep.say("Full!");
        }
        if (targetCreep.memory["emptyStore"]) {
            utils.storeEnergy(targetCreep);
            /*
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
                if (Game.spawns["Spawn1"].store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                    var upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
                    if (upgradeResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(targetCreep.room.controller);
                    }
                }
            }
            */
        }
        else {
            var targetSource = targetCreep.pos.findClosestByRange(FIND_SOURCES);
            
            var harvestResult = targetCreep.harvest(targetSource);
            if (harvestResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(targetSource);
            }
        }
    }    
};