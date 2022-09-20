module.exports = {
    body: [MOVE, CARRY, WORK],

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
            let roomSources = targetCreep.find(FIND_SOURCES);
            let closestSource = targetCreep.pos.findClosestByPath(roomSources);
            let harvestResult = targetCreep.harvest(closestSource);
            if (harvestResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(closestSource);
            }
        }
    }
}