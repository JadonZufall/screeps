module.exports = {
    cleanCreep: function() {
        // Cleans up dead creeps in memory.
        for (let creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                delete Memory.creeps[creepName];
            }
        }
    },

    setupCreep: function(targetCreep) {
        let currentRole = targetCreep.memory["role"];
        if (!currentRole) {
            targetCreep.memory["role"] = "unassigned";
            currentRole = targetCreep.memory["role"];
        }

        let currentCreateTick = targetCreep.memory["createTick"];
        if (!currentCreateTick) {
            targetCreep.memory["createTick"] = Game.time;
            currentCreateTick = targetCreep.memory["createTick"];
        }

        let currentCreateRoom = targetCreep.memory["createRoom"];
        if (!currentCreateRoom) {
            targetCreep.memory["createRoom"] = targetCreep.room.name;
            currentCreateRoom = targetCreep.memory["createRoom"];
        }

        targetCreep.memory = {
            "role": currentRole,
            "memoryConfigured": true,               // Stores if the creep's memory has been configured.
            "createTick": currentCreateTick,        // Stores the tick the creep was created.
            "configTick": Game.time,                // Stores the tick the creep was configured.
            "updateTick": Game.time,                // Stores the tick the creep was last updated.
            "resourceSwitches": {                   // Stores resource switches (True when full on resource, False when empty on resource)
                "energy": false,                    // RESOURCE_ENERGY switch.
            },
            "currentAction": null,                  // Stores the current action the creep is performing.
            "currentTarget": null,                  // Stores the current target the creep is performing on.
            "createRoom": currentCreateRoom,        // Stores the room which the creep was created in.
            "targetRoom": null,                     // Stores the room which the creep wants to get to.
            "deathSwitch": false                    // Stores if the creep is dying or not.
        };
    },

    updateCreep: function(targetCreep) {
        targetCreep.memory["updateTick"] = Game.time;
        
        if (targetCreep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["resourceSwitches"]["energy"] = false;
        }
        if (targetCreep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            targetCreep.memory["resourceSwitches"]["energy"] = true;
        }
        if (targetCreep.ticksToLive <= 300) {
            targetCreep.memory["deathSwitch"] = true;
        }
        if (targetCreep.ticksToLive >= 1000) {
            targetCreep.memory["deathSwitch"] = false;
        }
    },

    setupRoom: function(targetRoom) {
        targetRoom.memory = {
            "memoryConfigured": true,
            "configTick": Game.time,
            "updateTick": Game.time,
        }
    },

    updateRoom: function(targetRoom) {
        targetRoom.memory["updateTick"] = Game.time;
    },

    cleanConstruct: function() {
        
    }
}