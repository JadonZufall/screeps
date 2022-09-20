const memoryTools = require("memoryTools");

module.exports = {
    run: function() {
        memoryTools.cleanCreep();

        for (var creepName in Memory.creeps) {
            var targetCreep = Game.creeps[creepName];
            if (!"memoryConfigured" in targetCreep.memory) {
                memoryTools.setupCreep(targetCreep);
            }
            else {
                memoryTools.updateCreep(targetCreep);
            }
        }

        for (var roomName in Memory.rooms) {
            var targetRoom = Game.rooms[roomName];
            if (!"memoryConfigured" in targetRoom.memory) {
                memoryTools.setupRoom(targetRoom);
            }
            else {
                memoryTools.updateRoom(targetRoom);
            }
            memoryTools.cleanConstruct(targetRoom);
        }
    }
}