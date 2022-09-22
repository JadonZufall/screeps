
module.exports = {
    distanceEquation: function(x1, y1, x2, y2) {
        return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
    },
    
    findSources: function(targetRoom) {
        var result = {};
        var roomSources = targetRoom.find(FIND_SOURCES);
        for (var index in roomSources) {
            result[index] = roomSources[index].id;
        }
        return result;
    },
    
    findSourceSpaces: function(targetSource) {
        var result = 0;
        var targetRoom = targetSource.room;
        var xPos = targetSource.pos.x;
        var yPos = targetSource.pos.y;
        for (var xIndex in [-1, 0, 1]) {
            for (var yIndex in [-1, 0, 1]) {
                var deltaX = [-1, 0, 1][xIndex];
                var deltaY = [-1, 0, 1][yIndex];
                if (deltaX == 0 && deltaY == 0) {
                    continue;
                }
                else {
                    var targetTile = targetRoom.lookAt(xPos + deltaX, yPos + deltaY);
                    for (var index in targetTile) {
                        var targetInfo = targetTile[index];
                        if (targetInfo.type == "terrain") {
                            if (!targetInfo.terrain == TERRAIN_MASK_WALL) {
                                result++;
                            }
                            break;
                        }
                    }
                }
            }
        }
        return result;
    },
    
    findDamagedStructures: function(targetRoom) {
        var roomStructures = targetRoom.find(FIND_STRUCTURES);
        var damagedStructures = [];
        
        for (var index in roomStructures) {
            targetStructure = roomStructures[index];
            if (targetStructure.hits < targetStructure.hitsMax) {
                damagedStructures.push(targetStructure);
            }
        }
        
        return damagedStructures;
    },
    
    findPopulationCount: function(targetRoom) {
        var result = {}
        var roomCreeps = targetRoom.find(FIND_MY_CREEPS);
        for (var index in roomCreeps) {
            var targetCreep = roomCreeps[index];
            if (result[targetCreep.memory.role]) {
                result[targetCreep.memory.role] = result[targetCreep.memory.role] + 1;
            }
            else {
                result[targetCreep.memory.role] = 1;
            }
        }
        return result;
    },
    
    withdrawEnergy: function(targetCreep, withdrawSpawn=false, withdrawExtension=false, withdrawLink=false, withdrawStorage=false, withdrawTower=false, withdrawTerminal=false, withdrawContainer=false, withdrawAny=true, requireEnergy=true) {
        let roomTargets = []
        
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
                return true;
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
                    return true;
                }
                return true;
            }
            else {
                return false;
            }
        }
    },
    
    storeEnergy: function(targetCreep, storeSpawn=false, storeExtension=false, storeLink=false, storeStorage=false, storeTower=false, storeTerminal=false, storeContainer=false, storeAny=true, requireSpace=true) {
        let roomTargets = []
        
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
            roomTarget6s = roomTargets.concat(roomLinks);
        }
        //if (storeStorage || storeAny) {
        //    let roomStorages = targetCreep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_STORAGE}});
        //    roomTargets = roomTargets.concat(roomStorages);
        //}
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
                return true;
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
                    return true;
                }
                return true;
            }
            else {
                return false;
            }
        }
    },
};