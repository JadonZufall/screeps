const toolsMemory = require("toolsMemory");

module.exports = {
    run: function() {
        toolsMemory.cleanCreep();

        for (var creepName in Memory.creeps) {
            var targetCreep = Game.creeps[creepName];
            if (!targetCreep.memory["memoryConfigured"]) {
                toolsMemory.setupCreep(targetCreep);
            }
            else {
                toolsMemory.updateCreep(targetCreep);
            }
        }

        for (var roomName in Memory.rooms) {
            var targetRoom = Game.rooms[roomName];
            if (!targetRoom.memory["memoryConfigured"]) {
                toolsMemory.setupRoom(targetRoom);
            }
            else {
                toolsMemory.updateRoom(targetRoom);
            }
        }
    }
}