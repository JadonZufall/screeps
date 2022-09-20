const util = require("util");

module.exports = {
    cleanCreepMem: function() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    },
    
    setupCreepMem: function(targetCreep, targetRole) {
        targetCreep.memory = {
            "memoryConfigured": true,
            "memoryLastSetup": Game.time,
            "memoryLastUpdated": Game.time,
            "role": targetRole,
            "emptyStore": true,
            "fullStore": false,
        }
    },
    
    updateCreepMem: function(targetCreep) {
        if (targetCreep.memory["emptyStore"]) {
            if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                targetCreep.memory["emptyStore"] = false;
                targetCreep.memory["fullStore"] = true;
            }
        }
        else {
            if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
                targetCreep.memory["emptyStore"] = true;
                targetCreep.memory["fullStore"] = false;
            }
        }
    },
    
    setupRoomMem: function(targetRoom) {
        targetRoom.memory = {
            "memoryConfigured": true,
            "memoryLastSetup": Game.time,
            "memoryLastUpdated": Game.time,
            "damagedStructures": util.findDamagedStructures(targetRoom),
            "creepPopulations": util.findPopulationCount(targetRoom),
            "localSources": util.findSources(targetRoom),
            "sourceSpaces": {},
        }
        
        for (var index in targetRoom.memory["localSources"]) {
            var targetId = targetRoom.memory["localSources"][index];
            var targetSource = Game.getObjectById(targetId);
            targetRoom.memory["sourceSpaces"][targetId] = util.findSourceSpaces(targetSource);
        }
    },
    
    updateRoomMem: function(targetRoom) {
        targetRoom.memory["memoryLastUpdated"] = Game.time;
        targetRoom.memory["damagedStructures"] = util.findDamagedStructures(targetRoom);
        targetRoom.memory["creepPopulations"] = util.findPopulationCount(targetRoom);
    },
};