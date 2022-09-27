/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('RepairModule');
 * mod.thing == 'a thing'; // true
 */

const utils = require("utils");
const civilianUtils = require("civilianUtils");

module.exports = {
    run: function(targetCreep) {
        if (civilianUtils.hideUtil(targetCreep)) {
            return 0;
        }
        
        if (civilianUtils.workerRenewUtil(targetCreep)) {
            return 0;
        }
        if (utils.toRoom(targetCreep)) {
            return 0;
        }
        
        var repairResult = civilianUtils.repairUtil(targetCreep);
        
        if (repairResult == 1) {
            return 0;
        }
        else if (repairResult == 0) {
            utils.withdrawEnergy(targetCreep);
            return 0;
        }
    }
};