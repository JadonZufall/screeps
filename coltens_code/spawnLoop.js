/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawnLoop');
 * mod.thing == 'a thing'; // true
 */
 
const ST = require("spawnTemplates");

module.exports = {
    run: function(creepCounts) {
        
        for (index in creepCounts) {
            for (index2 in creepCounts[index]) {
                if (creepCounts[index][index2] > 0) {
                    if (index2 == 0) {
                        let spawnResult = ST.repairLevelFour(index);
                        if (spawnResult) {
                            return 0;
                        }
                    }
                    else if (index2 == 1) {
                        let spawnResult = ST.haulerLevelFour(index);
                        if (spawnResult) {
                            return 0;
                        }
                    }
                    else if (index2 == 2) {
                        let spawnResult = ST.builderLevelFour(index);
                        if (spawnResult) {
                            return 0;
                        }
                    }
                    else if (index2 == 3) {
                        let spawnResult = ST.harvesterLevelFour(index);
                        if (spawnResult) {
                            return 0;
                        }
                    }
                    else if (index2 == 4) {
                        let spawnResult = ST.colonizerLevelTwo(index);
                        if (spawnResult) {
                            return 0;
                        }
                    }
                    else if (index2 == 5) {
                        let spawnResult = ST.claimerLevelThree(index);
                        if (spawnResult) {
                            return 0;
                        }
                    }
                    else if (index2 == 6) {
                        let spawnResult = ST.scoutLevelTwo(index);
                        if (spawnResult) {
                            return 0;
                        }
                    }
                }
            }
        }
    }
};