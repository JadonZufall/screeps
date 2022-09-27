/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('combatUtils');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    attackNearestCreep: function(targetCreep) {
        let enemies = targetCreep.room.find(FIND_HOSTILE_CREEPS);
        let closestEnemy = targetCreep.pos.findClosestByPath(enemies);
        
        if (!closestEnemy) {
            return 0;
        }
        
        let attackResult = targetCreep.attack(closestEnemy);
        if (attackResult = ERR_NOT_IN_RANGE) {
            targetCreep.moveTo(closestEnemy);
            return 1;
        }
        else if (attackResult == 0) {
            return 1;
        }
        return 0;
    },
    
    attackNearestStructure: function(targetCreep) {
        let enemies = targetCreep.room.find(FIND_HOSTILE_STRUCTURES);
        let closestEnemy = targetCreep.pos.findClosestByPath(enemies);
        
        if (!closestEnemy) {
            return 0;
        }
        
        let attackResult = targetCreep.attack(closestEnemy);
        if (attackResult = ERR_NOT_IN_RANGE) {
            targetCreep.moveTo(closestEnemy);
            return 1;
        }
        else if (attackResult == 0) {
            return 1;
        }
        return 0;
    }
};