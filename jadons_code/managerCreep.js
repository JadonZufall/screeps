const roleManager = require("managerRole");


module.exports = {
    run: function(targetRoom) {
        let roomCreeps = targetRoom.find(FIND_MY_CREEPS);
        for (let index in roomCreeps) {
            let targetCreep = roomCreeps[index];

            if (!"role" in targetCreep.memory) {
                targetCreep.say("😵‍💫");
                console.log("Unhandled creep role, " + targetCreep.memory["role"]);
            }

            else if (targetCreep.memory["role"] == "unassigned" || !targetCreep.memory["role"]) {
                console.log(targetCreep.name + ", has an unassigned role.");
            }

            else if (targetCreep.memory["role"] in roleManager) {
                roleManager[targetCreep.memory["role"]].run(targetCreep);
            }
        }
    }
}