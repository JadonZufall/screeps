module.exports = {
    bodySetups: {
        0: [WORK, MOVE, CARRY],
        1: [WORK, MOVE, CARRY],
        2: [WORK, MOVE, CARRY],
        3: [WORK, MOVE, CARRY],
        4: [WORK, MOVE, CARRY],
        5: [WORK, MOVE, CARRY],
        6: [WORK, MOVE, CARRY],
        7: [WORK, MOVE, CARRY],
        8: [WORK, MOVE, CARRY],
    },

    targetPopulation: {
        0: 0, 1: 2, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0
    },

    run: function(targetCreep) {
        if (targetCreep.memory["resourceSwitches"]["energy"]) {
            let myRoomConstructs = targetCreep.room.find(FIND_MY_STRUCTURES);
            let myRoomStorages = [];
            for (let index in myRoomConstructs) {
                let targetConstruct = myRoomConstructs[index];
                if (targetConstruct.structureType == STRUCTURE_SPAWN || targetConstruct.structureType == STRUCTURE_EXTENSION) {
                    if (targetConstruct.store.getFreeCapacity(RESOURCE_ENERGY) != 0) {
                        myRoomStorages.push(targetConstruct);
                    }
                }
            }
            if (myRoomStorages.length) {
                let closestStorage = targetCreep.pos.findClosestByPath(myRoomStorages);
                let transferResult = targetCreep.transfer(closestStorage, RESOURCE_ENERGY);
                if (transferResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(closestStorage);
                }
            }
        }
        else {
            let roomSources = targetCreep.room.find(FIND_SOURCES);
            let closestSource = targetCreep.pos.findClosestByPath(roomSources);
            let harvestResult = targetCreep.harvest(closestSource);
            if (harvestResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(closestSource);
            }
        }
    }
}