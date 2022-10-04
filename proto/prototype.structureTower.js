module.exports = function() {
    StructureTower.prototype.update = function() {
        if (attackHostile()) {
            return;
        }
        if (healFriendly()) {
            return;
        }
        if (repairStructure()) {
            return;
        }
    };

    StructureTower.prototype.attackHostile = function() {
        var hostileOptions = this.room.find(FIND_HOSTILE_CREEPS);
        if (!hostileOptions.length) {
            return false;
        }
        var target = this.pos.findClosestByRange(hostileOptions);
        var result = this.attack(target);
        if (result == OK) {
            return true;
        }
        else {
            return false;
        }
    };

    StructureTower.prototype.healFriendly = function() {
        var creepOptions = this.room.find(FIND_MY_CREEPS);
        creepOptions = creepOptions.filter(obj => obj.hits != obj.hitsMax);
        if (!creepOptions.length) {
            return false;
        }
        var target = this.pos.findClosestByRange(creepOptions);
        var result = this.heal(target);
        if (result == OK) {
            return true;
        }
        else {
            return false;
        }
    };

    StructureTower.prototype.repairStructure = function() {
        var structureOptions = this.room.find(FIND_STRUCTURES);
        structureOptions = structureOptions.filter(obj => obj.hits != obj.hitsMax);
        if (!structureOptions.length) {
            return false;
        }
        var target = this.pos.findClosestByRange(structureOptions);
        var result = this.repair(target);
        if (result == OK) {
            return true;
        }
        else {
            return false;
        }
    };
}