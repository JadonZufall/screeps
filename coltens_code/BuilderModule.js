/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('BuilderModule');
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
        var upkeepResult = civilianUtils.controllerUpkeepUtil(targetCreep);
        
        if (upkeepResult == 1) {
            return 0;
        }
        else if (upkeepResult == 0) {
            utils.withdrawEnergy(targetCreep, withdrawSpawn=false, withdrawExtension=false, withdrawLink=false, withdrawStorage=true, withdrawTower=false, withdrawTerminal=true, withdrawContainer=true, withdrawAny=false, requireEnergy=true, storeAny=false);
            return 0;
        }
        
        var buildResult = civilianUtils.buildUtil(targetCreep);
        
        if (buildResult == 1) {
            return 0;
        }
        else if (buildResult == 0) {
            utils.withdrawEnergy(targetCreep);
            return 0;
        }
        
        var upgradeResult = civilianUtils.controllerUpgradeUtil(targetCreep);
        
        if (upgradeResult == 1) {
            return 0;
        }
        else if (upgradeResult == 0) {
            utils.withdrawEnergy(targetCreep);
            return 0;
        }
    }
};