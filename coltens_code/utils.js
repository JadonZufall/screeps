/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    distanceEquation: function(x1, y1, x2, y2) {
        return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
    },
    
    withdrawFromBuilding: function(targetCreep, buildingId, desiredResource = RESOURCE_ENERGY) {
        let building = Game.getObjectById(buildingId);
        if (building.store.getUsedCapacity(desiredResource) != 0) {
            let transferResult = targetCreep.withdraw(building, desiredResource);
            if (transferResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(building);
            }
            return true;
        }
        else {
            return false;
        }
    },
    
    withdrawEnergy: function(targetCreep, withdrawSpawn=false, withdrawExtension=false, withdrawLink=false, withdrawStorage=true, withdrawTower=false, withdrawTerminal=false, withdrawContainer=true, withdrawAny=false, requireEnergy=true) {
        let roomTargets = [];
        if (withdrawSpawn || withdrawAny) {
            let roomSpawn = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
            roomTargets = roomTargets.concat(roomSpawn);
        }
        if (withdrawExtension || withdrawAny) {
            let roomExtensions = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
            roomTargets = roomTargets.concat(roomExtensions);
        }
        if (withdrawLink || withdrawAny) {
            let roomLinks = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
            roomTargets = roomTargets.concat(roomLinks);
        }
        if (withdrawStorage || withdrawAny) {
            let roomStorages = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_STORAGE}});
            roomTargets = roomTargets.concat(roomStorages);
        }
        if (withdrawTower || withdrawAny) {
            let roomTowers = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            roomTargets = roomTargets.concat(roomTowers);
        }
        if (withdrawTerminal || withdrawAny) {
            let roomTerminals = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TERMINAL}});
            roomTargets = roomTargets.concat(roomTerminals);
        }
        if (withdrawContainer || withdrawAny) {
            let roomContainers = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
            roomTargets = roomTargets.concat(roomContainers);
        }
        
        if (!requireEnergy) {
            let closestTarget = targetCreep.pos.findClosestByPath(roomTargets);
            let withdrawResult = targetCreep.withdraw(closestTarget, RESOURCE_ENERGY);
            if (transferResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(closestTarget);
            }
            return true;
        }
        else {
            let validTargets = []
            for (index in roomTargets) {
                let currentTarget = roomTargets[index];
                if (currentTarget.store.getUsedCapacity(RESOURCE_ENERGY) != 0) {
                    validTargets.push(currentTarget);
                }
            }
            
            if (validTargets.length) {
                let closestTarget = targetCreep.pos.findClosestByRange(validTargets);
                let transferResult = targetCreep.withdraw(closestTarget, RESOURCE_ENERGY);
                if (transferResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(closestTarget);
                }
                return true;
            }
            else {
                return false;
            }
        }
    },
    
    storeInBuilding: function(targetCreep, buildingId, desiredResource=RESOURCE_ENERGY) {
        let building = Game.getObjectById(buildingId);
        if (building.store.getFreeCapacity(desiredResource) != 0) {
            let transferResult = targetCreep.transfer(building, desiredResource);
            if (transferResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(building);
            }
            return true;
        }
        else {
            return false;
        }
    },
    
    storeEnergy: function(targetCreep, storeAny=false, storeExtension=false, storeLink=false, storeStorage=false, storeTower=false, storeTerminal=false, storeContainer=false, storeSpawn=false, requireSpace=true) {
        let roomTargets = [];
        if (storeSpawn || storeAny) {
            let roomSpawn = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_SPAWN}});
            roomTargets = roomTargets.concat(roomSpawn);
        }
        if (storeExtension || storeAny) {
            let roomExtensions = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
            roomTargets = roomTargets.concat(roomExtensions);
        }
        if (storeLink || storeAny) {
            let roomLinks = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
            roomTargets = roomTargets.concat(roomLinks);
        }
        if (storeStorage || storeAny) {
            let roomStorages = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_STORAGE}});
            roomTargets = roomTargets.concat(roomStorages);
        }
        if (storeTower || storeAny) {
            let roomTowers = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            roomTargets = roomTargets.concat(roomTowers);
        }
        if (storeTerminal || storeAny) {
            let roomTerminals = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TERMINAL}});
            roomTargets = roomTargets.concat(roomTerminals);
        }
        if (storeContainer || storeAny) {
            let roomContainers = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
            roomTargets = roomTargets.concat(roomContainers);
        }
        
        if (!requireSpace) {
            // Do not check if there is space left in the target.
            let closestTarget = targetCreep.pos.findClosestByPath(roomTargets);
            let transferResult = targetCreep.transfer(closestTarget, RESOURCE_ENERGY);
            if (transferResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(closestTarget);
            }
            return true;
        }
        else {
            // Check if there is space left in the target.
            let validTargets = []
            for (index in roomTargets) {
                let currentTarget = roomTargets[index];
                if (currentTarget.store.getFreeCapacity(RESOURCE_ENERGY) != 0) {
                    validTargets.push(currentTarget);
                }
            }
            
            if (validTargets.length) {
                let closestTarget = targetCreep.pos.findClosestByRange(validTargets);
                let transferResult = targetCreep.transfer(closestTarget, RESOURCE_ENERGY);
                if (transferResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(closestTarget);
                }
                return true;
            }
            else {
                return false;
            }
        }
    },
    
    findDamagedBuildingsByRoomName: function(aRoom) {
        thisRoom = Game.rooms[aRoom];
        if (!thisRoom) {
            return {};
        }
        var allBuildings = thisRoom.find(FIND_STRUCTURES);
        var damagedBuildings = [];
        
        for (index in allBuildings) {
            if (allBuildings[index].hits < allBuildings[index].hitsMax) {
                damagedBuildings.push(allBuildings[index].id);
            }
        }
        
        return damagedBuildings;
    },
    
    toRoom: function(targetCreep, targetRoom = targetCreep.memory["homeRoom"]) {
        if (targetCreep.room.name != targetRoom) {
            let newRoomPos = new RoomPosition(25, 25, targetRoom);
            targetCreep.moveTo(newRoomPos);
            return 1;
        }
    }
};