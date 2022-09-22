const creepUtils = require("utilsCreep");


module.exports = {
    bodySetups: {
        0: [WORK, MOVE, CARRY],
        1: [WORK, MOVE, MOVE, CARRY, CARRY],
        2: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        3: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        4: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        5: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        6: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        7: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        8: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    },

    targetPopulation: {
        0: 1, 1: 2, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2
    },

    run: function(targetCreep) {
        if (targetCreep.memory["resourceSwitches"]["energy"]) {
            if (targetCreep.memory["currentAction"] == "withdraw") {
                targetCreep.say("💭❓");
                targetCreep.memory["currentAction"] = "build";
                targetCreep.memory["currentTarget"] = null;
            }

            if (targetCreep.memory["currentAction"] == "build") {
                if (!targetCreep.memory["currentTarget"]) {
                    targetCreep.say("👀🔨");
                    let closestSite = targetCreep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    if (closestSite) {
                        targetCreep.memory["currentTarget"] = closestSite.id;
                    }
                    else {
                        targetCreep.memory["currentAction"] = "upgrade";
                    }
                }
                else {
                    let targetSite = Game.getObjectById(targetCreep.memory["currentTarget"]);
                    if (targetSite) {
                        targetCreep.say("👀🔨");
                        let buildResult = targetCreep.build(closestSite);
                        if (buildResult == ERR_NOT_IN_RANGE) {
                            targetCreep.moveTo(targetSite);
                        }
                    }
                    else {
                        targetCreep.say("💭❓");
                        targetCreep.memory["currentTarget"] = null;
                    }
                }
            }

            if (targetCreep.memory["currentAction"] == "upgrade") {
                targetCreep.say("⏫🎮")
                targetCreep.memory["currentTarget"] = null;
                let upgradeResult = targetCreep.upgradeController(targetCreep.room.controller);
                if (upgradeResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(targetCreep.room.controller);
                }
            }
        }
        else {
            if (!targetCreep.memory["currentAction"] == "withdraw") {
                targetCreep.say("👀⚡");
                targetCreep.memory["currentAction"] = "withdraw";
                targetCreep.memory["currentTarget"] = null;
            }
            if (!targetCreep.memory["currentTarget"]) {
                let targetStorage = creepUtils.findEnergyStorage(targetCreep, args=creepUtils.defaultArgs.withdrawEnergy);
                if (targetStorage) {
                    targetCreep.say("👀⚡");
                    targetCreep.memory["currentTarget"] = targetStorage.id;
                }
                else {
                    targetCreep.say("⛔⚡");
                    targetCreep.memory["currentTarget"] = null;
                }
            }
            else {
                let targetStorage = Game.getObjectById(targetCreep.memory["currentTarget"]);
                if (!targetStorage) {
                    targetCreep.say("😥⚡");
                    targetCreep.memory["currentTarget"] = null;
                }
                else if (targetStorage.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                    targetCreep.say("🈵⚡");
                    targetCreep.memory["currentTarget"] = null;
                }
                else {
                    targetCreep.say("👀⚡");
                    let withdrawResult = targetCreep.withdraw(targetStorage);
                    targetCreep.memory["currentTarget"] = targetStorage;
                    if (withdrawResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(withdrawResult);
                    }
                }
            }
        }
    }
}
