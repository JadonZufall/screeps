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
        var thisRoom = Game.rooms[targetCreep.memory["homeRoom"]];
        
        var thisRoomsTowers = thisRoom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        var closestTower = targetCreep.pos.findClosestByPath(thisRoomsTowers);
        
        if(targetCreep.hits < targetCreep.hitsMax) {
            targetCreep.moveTo(closestTower);
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
        
        if (targetCreep.memory["imDying"] == true && closestSpawn.store.getFreeCapacity(RESOURCE_ENERGY) < closestSpawn.store.getCapacity(RESOURCE_ENERGY)/2) {
            var renewResult = thisRoomsSpawns[0].renewCreep(targetCreep);
            if (renewResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(thisRoomsSpawns[0]);
            }
            return 0;
        }
        
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