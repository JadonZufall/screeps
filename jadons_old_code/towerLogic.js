const util = require("util");

module.exports = {
    run: function(targetTower) {
        var enemyCreeps = targetTower.room.find(FIND_HOSTILE_CREEPS);
        if (enemyCreeps.length) {
            var closestEnemy = targetTower.pos.findClosestByRange(enemyCreeps);
            var attackResult = targetTower.attack(closestEnemy);
            if (attackResult != ERR_NOT_IN_RANGE) {
                return;
            }
        }
        
        var damagedStructures = util.findDamagedStructures(targetTower.room);
        if (damagedStructures.length) {
            var closestStructure = targetTower.pos.findClosestByRange(damagedStructures);
            var repairResult = targetTower.repair(closestStructure);
        }
    }
};