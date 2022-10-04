module.exports = function() {
    /**
     * Validates this objects room memory, if missing memory assignment then the memory will be fixed.
     */
    Source.prototype.validateMemory = function() {
        if (!this.room.memory["sources"][this.id]) {
            this.room.memory["sources"][this.id] = {};
        }
        if (!this.room.memory["sources"][this.id]["creeps"]) {
            this.room.memory["sources"][this.id] = [];
        }
    };

    Source.prototype.cleanupMemory = function() {
        var creepOptions = this.room.memory["sources"][this.id]["creeps"];
        for (var [key, val] in Object.entries(creepOptions)) {
            if (!Game.getObjectById(val)) {
                this.removeCreep(val);
            }
        }
    }

    Source.prototype.assignCreep = function(target) {
        this.room.memory["sources"][this.id]["creeps"].push(target.id);
    };

    Source.prototype.removeCreep = function(target) {
        this.room.memory["sources"][this.id]["creeps"] = this.room.memory["sources"][this.id]["creeps"].filter(val => val != target.id);
    }

    /**
     * Gets the ids of assigned creeps.
     * @returns {[String]}       An array containing the ids of the creeps assigned to this source.
     */
    Source.prototype.getAssignedCreepIds = function() {
        var result = this.room.memory["sources"][this.id]["creeps"]
        return this.room.memory["sources"][this.id]["creeps"]
    };

    /**
     * Gets the objects of assigned creeps.
     * @returns {[Creep]}       An array containing the creeps assigned to this source.
     */
    Source.prototype.getAssignedCreeps = function() {
        return this.getAssignedCreepIds().map(function(id) {
            return Game.getObjectById(id);
        });
    };
}