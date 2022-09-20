const roleDefault = require("roleDefault");
const roleBuilder = require("roleBuilder");
const roleCleaner = require("roleCleaner");
const roleDriller = require("roleDriller");
const rolePusher = requre("rolePusher");


module.exports = {
    run: function(targetRoom) {
        for (let creepName in targetRoom.find(FIND_MY_CREEPS)) {
            let targetCreep = Game.creeps[creepName];

            if (targetCreep.memory["role"] == "unassigned") {
                console.log(targetCreep.name + ", has an unassigned role.");
            }

            else if (targetCreep.memory["role"] == "default") {
                roleDefault.run(targetCreep);                
            }
            
            else if (targetCreep.memory["role"] == "builder") {
                roleBuilder.run(targetCreep);
            }

            else if (targetCreep.memory["role"] == "cleaner") {
                roleCleaner.run(targetCreep);
            }

            else if (targetCreep.memory["role"] == "driller") {
                roleDriller.run(targetCreep);
            }

            else if (targetCreep.memory["role"] == "pusher") {
                rolePusher.run(targetCreep);
            }

            else {
                console.log("Unhandled creep role, " + targetCreep.memory["role"]);
            }
        }
    }
}