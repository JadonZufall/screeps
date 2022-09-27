/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('civilianUtils');
 * mod.thing == 'a thing'; // true
 */
const utils = require("utils");

module.exports = {
    harvestUtil: function(targetCreep) {
        if (!targetCreep.memory["targetSource"]) {
            targetCreep.memory["targetSource"] = "none";
        }
        
        if (!targetCreep.memory["emptyStore"]) {
            targetCreep.memory["emptyStore"] = false;
        }
        
        if (Game.getObjectById(targetCreep.memory["targetSource"]) && Game.getObjectById(targetCreep.memory["targetSource"]) != "none" && Game.getObjectById(targetCreep.memory["targetSource"]).energy == 0) {
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
        
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && targetCreep.memory["targetSource"] == "none") {
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
            targetCreep.memory["targetSource"] = "none";
            return 0;
        }
        else {
            var harvestResult = targetCreep.harvest(Game.getObjectById(targetCreep.memory["targetSource"]));
            if (harvestResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(Game.getObjectById(targetCreep.memory["targetSource"]));
            }
            return 1;
        }
    },
    
    hideUtil: function(targetCreep) {
        var thisRoom = targetCreep.room;
        
        var thisRoomsTowers = thisRoom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        var closestTower = targetCreep.pos.findClosestByPath(thisRoomsTowers);
        
        if (targetCreep.hits < targetCreep.hitsMax) {
            targetCreep.say("fuck");
            if (closestTower) {
                targetCreep.moveTo(closestTower);
                return 1;
            }
            return 0;
        }
        return 0;
    },
    
    repairUtil: function(targetCreep) {
        var thisRoom = targetCreep.room;
        var thisRoomName = thisRoom.name;
        
        if (!targetCreep.memory["fullStore"]) {
            targetCreep.memory["fullStore"] = false;
        }
        
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = false;
        }
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = true;
        }
        if (targetCreep.memory["fullStore"]) {
            var thisRoomsDamagedBuildings = Memory["rooms"][thisRoomName]["damagedBuildings"];
            if (thisRoomsDamagedBuildings[0]) {
                var roomsDamagedBuildings = [];
                
                for (index in thisRoomsDamagedBuildings) {
                    var buildings = Game.getObjectById(thisRoomsDamagedBuildings[index]);
                    roomsDamagedBuildings.push(buildings);
                }
                
                var closestDamagedBuilding = targetCreep.pos.findClosestByRange(roomsDamagedBuildings);
                
                var repairResult = targetCreep.repair(closestDamagedBuilding);
                if (repairResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(closestDamagedBuilding);
                }
                return 1;
            }
            else {
                return 2;
            }
        }
        else {
            return 0;
        }
    },
    
    buildUtil: function(targetCreep) {
        var thisRoom = targetCreep.room;
        var thisRoomName = thisRoom.name;
        
        if (!targetCreep.memory["fullStore"]) {
            targetCreep.memory["fullStore"] = false;
        }
        
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = false;
        }
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = true;
        }
        if (targetCreep.memory["fullStore"]) {
            var targets = thisRoom.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                var closestBuild = targetCreep.pos.findClosestByRange(targets);
                var buildResult = targetCreep.build(closestBuild);
                if (buildResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(closestBuild);
                }
                return 1;
            }
            else {
                return 2;
            }
        }
        else {
            return 0;
        }
    },
    
    controllerUpkeepUtil: function(targetCreep) {
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
                    return 1;
                } else if (upgradeResult == ERR_NOT_OWNER) {
                    return 2;
                }
                return 1;
            }
            else {
                return 2;
            }
        }
        else {
            return 0;
        }
    },
    
    controllerUpgradeUtil: function(targetCreep) {
        if (!targetCreep.room.controller.my) {
            return 0;
        }
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = false;
        }
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["fullStore"] = true;
        }
        if (targetCreep.memory["fullStore"]) {
            var upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
            if (upgradeResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(targetCreep.room.controller);
            } 
            else if (upgradeResult == ERR_NOT_OWNER) {
                return 0;
            }
            return 1;
        }
        else {
            return 0;
        }
    },
    
    workerRenewUtil: function(targetCreep) {
        var thisRoom = targetCreep.room;
        var currentRoomName = thisRoom.name;
        
        if (!targetCreep.memory["imDying"]) {
            targetCreep.memory["imDying"] = false;
        }
        
        if (targetCreep.ticksToLive < 250) {
            targetCreep.memory["imDying"] = true;
        }
        if (targetCreep.ticksToLive > 1450) {
            targetCreep.memory["imDying"] = false;
        }
        
        var thisRoomsSpawns = thisRoom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
        var closestSpawn = targetCreep.pos.findClosestByPath(thisRoomsSpawns);
        
        if (targetCreep.memory["imDying"] == 1) {
            if (closestSpawn) {
                var renewalEnergy = 0;
                for (index in thisRoomsSpawns) {
                    renewalEnergy += thisRoomsSpawns[index].energy;
                }
                
                var extensions = thisRoom.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
                for (index in extensions) {
                    renewalEnergy += extensions[index].energy;
                }
                
                if (renewalEnergy > 50) {
                    let renewResult = closestSpawn.renewCreep(targetCreep);
                    if (renewResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(closestSpawn);
                        }
                    return 1;
                }
                else if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) > targetCreep.store.getFreeCapacity(RESOURCE_ENERGY)) {
                    if (utils.storeEnergy(targetCreep, storeAny=false, storeExtension=true, storeLink=false, storeStorage=false, storeTower=false, storeTerminal=false, storeContainer=false, storeSpawn=true, requireSpace=true)) {
                        return 1;
                    }
                }
            }
            else {
                let roomNeighbors = Memory["rooms"][currentRoomName]["neighbors"];
                let allRooms = [];
                for (index2 in Memory["rooms"]) {
                    allRooms.push(index2);
                }
                
                for (index in roomNeighbors) {
                    if (allRooms.includes(roomNeighbors[index])) {
                        let tmp = Memory["rooms"][roomNeighbors[index]]["spawns"];
                        if (tmp[0]) {
                            targetCreep.drop(RESOURCE_ENERGY);
                            targetCreep.moveTo(new RoomPosition(25, 25, roomNeighbors[index]));
                            return 1;
                        }
                    }
                }
            }
        }
        return 0;
    },
    
    scavengeUtil: function (targetCreep) {
        droppedResources = targetCreep.room.find(FIND_DROPPED_RESOURCES, {filter: {resourceType: RESOURCE_ENERGY}});
        closestResource = targetCreep.pos.findClosestByPath(droppedResources);
        if (closestResource && targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            pickupResult = targetCreep.pickup(closestResource);
            if (pickupResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(closestResource);
            }
            return 1;
        }
        return 0;
    },
    
    salvageUtil: function(targetCreep) {
        let ruins = targetCreep.room.find(FIND_RUINS);
        if (!ruins) {
            return 0;
        }
        
        let closestRuin = targetCreep.pos.findClosestByPath(ruins);
        
        let salvageResult = targetCreep.dismantle(closestRuin);
        if (salvageResult == ERR_NOT_IN_RANGE) {
            targetCreep.moveTo(closestRuin);
            return 1;
        }
        else if (!salvageResult) {
            return 1;
        }
        return 0;
    }
};