/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BuilderModule');
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
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = false;
        }
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = true;
        }
        if (targetCreep.memory["fullStore"]) {
            var roomController = targetCreep.room.controller;
            if (roomController.ticksToDowngrade < 3000) {
                var upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
                if (upgradeResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(roomController);
                }
            }
            else {
                var targets = targetCreep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    var closestBuild = targetCreep.pos.findClosestByRange(targets);
                    var buildResult = targetCreep.build(closestBuild);
                    if (buildResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(closestBuild);
                    }
                }
                else if (Game.rooms["W8N3"].memory["damagedBuildings"][0]) {
                    var roomsDamagedBuildings = [];
                    
                    for (index in Game.rooms["W8N3"].memory["damagedBuildings"]) {
                        var buildings = Game.getObjectById(Game.rooms["W8N3"].memory["damagedBuildings"][index]);
                        roomsDamagedBuildings.push(buildings);
                    }
                    
                    var closestDamagedBuilding = targetCreep.pos.findClosestByRange(roomsDamagedBuildings);
                    
                    var repairResult = targetCreep.repair(closestDamagedBuilding);
                    if (repairResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(closestDamagedBuilding);
                    }
                }
                else {
                    var upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
                    if (upgradeResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(targetCreep.room.controller);
                    }
                }
            }
        }
        else {
            utils.withdrawEnergy(targetCreep);
        }
    }
};