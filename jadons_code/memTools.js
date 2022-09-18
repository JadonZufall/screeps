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
        }
    },
    
    updateCreepMem: function(targetCreep) {
        
    },
    
    setupRoomMem: function(targetRoom) {
        targetRoom.memory = {
            "memoryConfigured": true,
            "memoryLastSetup": Game.time,
            "memoryLastUpdated": Game.time,
            "damagedStructures": util.findDamagedStructures(targetRoom),
            "creepPopulations": util.findPopulationCount(targetRoom),
            "localSources": util.findSources(targetRoom),
        }
    },
    
    updateRoomMem: function(targetRoom) {
        targetRoom.memory["memoryLastUpdated"] = Game.time;
        targetRoom.memory["damagedStructures"] = util.findDamagedStructures(targetRoom);
        targetRoom.memory["creepPopulations"] = util.findPopulationCount(targetRoom);
    },
};