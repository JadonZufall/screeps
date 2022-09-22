/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('worker');
 * mod.thing == 'a thing'; // true
 */
 const utils = require("util");

module.exports = {
    run: function(targetCreep) {
        if (targetCreep.memory["fullStore"]) {
            utils.storeEnergy(targetCreep);
        }
        else {
            var targetSource = targetCreep.pos.findClosestByRange(FIND_SOURCES);
            
            var harvestResult = targetCreep.harvest(targetSource);
            if (harvestResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(targetSource);
            }
        }
    }    
};