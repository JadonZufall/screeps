module.exports = {
    run: function(targetStructure) {
        targetStructure.room.visual.circle(targetStructure.pos, {fill: "transparent", radius: TOWER_FALLOFF_RANGE, stroke: "red", opacity: 0.2, strokeWidth: 0.1, lineStyle: "dotted"});
        targetStructure.room.visual.circle(targetStructure.pos, {fill: "transparent", radius: TOWER_OPTIMAL_RANGE, stroke: "green", opacity: 0.5, strokeWidth: 0.1, lineStyle: "dotted"});

        let hostileCreeps = targetStructure.room.find(FIND_HOSTILE_CREEPS);
        let closestHostile = targetStructure.pos.findClosestByRange(hostileCreeps);
        if (closestHostile) {
            let attackResult = targetStructure.attack(closestHostile);
            if (attackResult != ERR_NOT_IN_RANGE) {
                return null;
            }
        }

        let myStructures = targetStructure.room.find(FIND_MY_STRUCTURES);
        let myDamagedStructures = [];
        for (let index in myStructures) {
            let targetStructure = myStructures[index];
            if (targetStructure.hits < targetStructure.hitsMax) {
                myDamagedStructures.push(targetStructure);
            }
        }
        let myClosestStructure = targetStructure.pos.findClosestByRange(myDamagedStructures);
        if (myClosestStructure) {
            let repairResult = targetStructure.repair(myClosestStructure);
            if (repairResult != ERR_NOT_IN_RANGE) {
                return null;
            }
        }
    }
}