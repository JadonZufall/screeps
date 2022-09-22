/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('TowerModule');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(targetTower) {
        if (targetTower.room.find(FIND_HOSTILE_CREEPS) && targetTower.attack(targetTower.pos.findClosestByRange(targetTower.room.find(FIND_HOSTILE_CREEPS))) != ERR_NOT_IN_RANGE) {
            return 0;
        }
        
        var myCreeps = targetTower.room.find(FIND_MY_CREEPS);
        var myInjuredCreeps = [];
        
        for (index in myCreeps) {
            if (myCreeps[index].hits < myCreeps[index].hitsMax) {
                myInjuredCreeps.push(myCreeps[index]);
            }
        }
        
        if (myInjuredCreeps.length && targetTower.heal(targetTower.pos.findClosestByRange(myInjuredCreeps)) != ERR_NOT_IN_RANGE) {
            return 0;
        }
        else {
            var buildingSites = targetTower.room.find(FIND_CONSTRUCTION_SITES);
            if (buildingSites.length) {
                var closestBuild = targetTower.pos.findClosestByRange(targets);
                var buildResult = targetTower.build(closestBuild);
                if (buildResult == ERR_NOT_IN_RANGE) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
    }
};