/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnTemplates');
 * mod.thing == 'a thing'; // true
 */
const SU = require("spawnUtils");

module.exports = {
    haulerLevelFour: function (homeRoom) {
        let creepName = "UrbanHauler " + homeRoom + " " + Game.time.toString();
        let haulerRecipe = [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
        let creepMem = {"role": "hauler", "homeRoom": homeRoom};
        if (SU.creepFromNearestSpawn(homeRoom, creepName, haulerRecipe, creepMem)) {
            return 1;
        }
        return 0;
    },
    
    harvesterLevelFour: function(homeRoom) {
        let creepName = "UrbanHarvester " + homeRoom + " " + Game.time.toString();
        let harvesterRecipe = [MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY];
        let creepMem = {"role": "harvester", "homeRoom" : homeRoom};
        if (SU.creepFromNearestSpawn(homeRoom, creepName, harvesterRecipe, creepMem)) {
            return 1;
        }
        return 0;
    },
    
    repairLevelFour: function(homeRoom) {
        let creepName = "UrbanRepair " + homeRoom + " " + Game.time.toString();
        let repairRecipe = [MOVE, MOVE, WORK, CARRY, CARRY, CARRY];
        let creepMem = {"role": "repair", "homeRoom" : homeRoom};
        let spawnResult = SU.creepFromNearestSpawn(homeRoom, creepName, repairRecipe, creepMem);
        if (spawnResult) {
            return 1;
        }
        return 0;
    },
    
    builderLevelFour: function (homeRoom) {
        let creepName = "UrbanBuilder " + homeRoom + " " + Game.time.toString();
        let builderRecipe = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
        let creepMem = {"role": "builder", "homeRoom" : homeRoom};
        if (SU.creepFromNearestSpawn(homeRoom, creepName, builderRecipe, creepMem)) {
            return 1;
        }
        return 0;
    },
    
    colonizerLevelTwo: function(homeRoom) {
        let creepName = "Colonizer " + homeRoom + " " + Game.time.toString();
        let colonizerRecipe = [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY];
        let creepMem = {"role": "colonizer", "homeRoom" : homeRoom};
        if (SU.creepFromNearestSpawn(homeRoom, creepName, colonizerRecipe, creepMem)) {
            return 1;
        }
        return 0;
    },
    
    claimerLevelThree: function(homeRoom) {
        let creepName = "claimer " + homeRoom + " " + Game.time.toString();
        let claimerRecipe = [MOVE, MOVE, CLAIM, CLAIM];
        let creepMem = {"role": "claimer", "homeRoom" : homeRoom};
        if (SU.creepFromNearestSpawn(homeRoom, creepName, claimerRecipe, creepMem)) {
            return 1;
        }
        return 0;
    },
    
    scoutLevelTwo: function(homeRoom) {
        let creepName = "scout " + homeRoom + " " + Game.time.toString();
        let scoutRecipe = [MOVE];
        let creepMem = {"role": "scout", "homeRoom" : homeRoom};
        if (SU.creepFromNearestSpawn(homeRoom, creepName, scoutRecipe, creepMem)) {
            return 1;
        }
        return 0;
    },
    
    meleeLevelSix: function(homeRoom) {
        let creepName = "attack " + homeRoom + " " + Game.time.toString();
        let attackRecipe = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CLAIM, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH];
        let creepMem = {"role": "attack", "homeRoom" : homeRoom};
        if (SU.creepFromNearestSpawn(homeRoom, creepName, attackRecipe, creepMem)) {
            return 1;
        }
        return 0;
    }
};