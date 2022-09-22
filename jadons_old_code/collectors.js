/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('collectors');
 * mod.thing == 'a thing'; // true
 */
 const util = require("util");

module.exports = {
    run: function(targetCreep) {
        if (targetCreep.memory["emptyStore"]) {
            var target = targetCreep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            var pickupResult = targetCreep.pickup(target);
            if (pickupResult == ERR_NOT_IN_RANGE) {
                targetCreep.moveTo(target);
            }
        }
        else {
            util.storeEnergy(targetCreep);
        }
    }
};