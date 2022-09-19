/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('WorkerModule');
 * mod.thing == 'a thing'; // true
 */
const utils = require("utils");


module.exports = {
    run: function(targetCreep) {
        if (Game.getObjectById(targetCreep.memory["targetSource"]) && Game.getObjectById(targetCreep.memory["targetSource"]).energy == 0) {
            let sources = targetCreep.room.find(FIND_SOURCES);
            let highestSource = sources[0];
            for (let index in sources) {
                if ((sources[index].energy/sources[index].ticksToRegeneration) > (highestSource.energy/highestSource.ticksToRegeneration)) {
                    highestSource = sources[index];
                }
                else if (!sources[index].ticksToRegeneration ) {
                    highestSource = sources[index];
                }
            }
            targetCreep.memory["targetSource"] = highestSource.id;
        }
        
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            // Target creep is out of room to store resource energy.
            targetCreep.memory["emptyStore"] = true;
        }
        
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            // Target creep has unloaded all of it's resource energy.
            targetCreep.memory["emptyStore"] = false;
            let sources = targetCreep.room.find(FIND_SOURCES);
            let highestSource = sources[0];
            for (let index in sources) {
                if ((sources[index].energy/sources[index].ticksToRegeneration) > (highestSource.energy/highestSource.ticksToRegeneration)) {
                    highestSource = sources[index];
                }
                else if (!sources[index].ticksToRegeneration ) {
                    highestSource = sources[index];
                }
            }
            targetCreep.memory["targetSource"] = highestSource.id;
        }
        
        if (targetCreep.memory["emptyStore"]) {
            if (utils.storeEnergy(targetCreep, storeAny=false, storeExtension=true, storeSpawn=true)) {
            
            } 
            else if (utils.storeEnergy(targetCreep, storeAny=true)) {
                
            }
        }
        else {
            var harvestResult = targetCreep.harvest(Game.getObjectById(targetCreep.memory["targetSource"]));
            if (harvestResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(Game.getObjectById(targetCreep.memory["targetSource"]));
            }
        }
    }
};