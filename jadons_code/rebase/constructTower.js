module.exports = {
    run: function(targetTower) {
        targetTower.room.visual.circle(targetTower.pos, {fill: "transparent", radius: TOWER_FALLOFF_RANGE, stroke: "red", opacity: 0.2, strokeWidth: 0.1, lineStyle: "dotted"});
        targetTower.room.visual.circle(targetTower.pos, {fill: "transparent", radius: TOWER_OPTIMAL_RANGE, stroke: "green", opacity: 0.5, strokeWidth: 0.1, lineStyle: "dotted"});

        let hostileCreeps = targetTower.room.find(FIND_HOSTILE_CREEPS);
        let closestHostile = targetTower.pos.findClosestByRange(hostileCreeps);
        if (closestHostile) {
            let attackResult = targetTower.attack(closestHostile);
            if (attackResult != ERR_NOT_IN_RANGE) {
                return null;
            }
        }

        let myStructures = targetTower.room.find(FIND_MY_STRUCTURES);
        let myDamagedStructures = [];
        for (let index in myStructures) {
            let targetStructure = myStructures[index];
            if (targetStructure.hits < targetStructure.hitsMax) {
                myDamagedStructures.push(targetStructure);
            }
        }
        let myClosestStructure = targetTower.pos.findClosestByRange(myDamagedStructures);
        if (myClosestStructure) {
            let repairResult = targetTower.repair(myClosestStructure);
            if (repairResult != ERR_NOT_IN_RANGE) {
                return null;
            }
        }
    }
}