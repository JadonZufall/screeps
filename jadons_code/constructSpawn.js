const roleManager = require("managerRole");

module.exports = {
    run: function(targetStructure) {
        if (targetStructure.spawning) {
            return null;
        }

        const populationTemplate = roleManager.getPopulationTemplate();
        let controllerLevel = targetStructure.room.controller.level;
        let populationCount = roleManager.getPopulationTemplate();

        let roomCreeps = targetStructure.room.find(FIND_MY_CREEPS);
        for (let index in roomCreeps) {
            let targetCreep = roomCreeps[index];
            let creepRole = targetCreep.memory["role"];
            if (creepRole in populationCount) {
                populationCount[creepRole]++;
            }
            else {
                populationCount[creepRole] = 1;
            }
        }

        let spawnOptions = []
        for (let index in Object.keys(populationCount)) {
            let currentRole = Object.keys(populationCount)[index];
            if (currentRole in roleManager) {
                let desiredPopulation = roleManager[currentRole].targetPopulation[controllerLevel];
                if (populationCount[currentRole] < desiredPopulation) {
                    spawnOptions.push(currentRole);
                }
            }
        }

        if (spawnOptions.length) {
            let minPopulation = populationCount[spawnOptions[0]];
            let minOption = spawnOptions[0];
            for (let index in spawnOptions) {
                let currentRole = spawnOptions[index];
                let currentPop = populationCount[currentRole];
                if (currentPop < minPopulation) {
                    minOption = currentRole;
                }
            }

            let targetBody = roleManager[minOption].bodySetups[controllerLevel];
            let targetName = minOption + " " + Game.time + " " + targetStructure.room.name;
            let targetMem = {"role": minOption, "memoryConfigured": false, "createTick": Game.time, "createRoom": targetStructure.room.name};
            targetStructure.spawnCreep(targetBody, targetName, targetMem);
        }
    }
}