module.exports = {
    body: [MOVE, CARRY, WORK],

    run: function(targetCreep) {
        if (targetCreep.memory["resourceSwitches"]["energy"]) {
            let closestSite = targetCreep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (closestSite) {
                let buildResult = targetCreep.build(closestSite);
                if (buildResult == ERR_NOT_IN_RANGE) {
                    targetCreep.moveTo(closestSite);
                }
            }
            else {
                let roomController = targetCreep.room.controller;
                if (roomController.my) {
                    let upgradeResult = targetCreep.upgradeController();
                    if (upgradeResult == ERR_NOT_IN_RANGE) {
                        targetCreep.moveTo(roomController);
                    }
                }
            }
        }
        else {
            
        }
    }
}
