/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('WorkerModule');
 * mod.thing == 'a thing'; // true
 */
const utils = require("utils");
const civilianUtils = require("civilianUtils");


module.exports = {
    run: function(targetCreep) {
        var thisRoom = targetCreep.room;
        
        if (civilianUtils.hideUtil(targetCreep)) {
            return 0;
        }
        
        if (civilianUtils.workerRenewUtil(targetCreep)) {
            return 0;
        }
        if (utils.toRoom(targetCreep)) {
            return 0;
        }
        if (!civilianUtils.harvestUtil(targetCreep)) {
            if (utils.storeEnergy(targetCreep, storeAny=false, storeExtension=true, storeSpawn=true)) {
            
            } 
            else if (utils.storeEnergy(targetCreep, storeAny=true)) {
                
            }
        }
    }
};