module.exports = function() {
    StructureLink.prototype.update = function() {
        if (!this.doOutput) {
            return;
        }
        if (this.store[RESOURCE_ENERGY] > this.store.getCapacity(RESORUCE_ENERGY) / 2) {
            this.transferEnergy(this.room.getOutputLink());
        }
    };

    StructureLink.prototype.validateMemory = function() {
        if (!this.room.memory["links"][this.id]) {
            this.room.memory["links"][this.id] = {};
        }
        if (!this.room.memory["links"][this.id]["doOutput"]) {
            this.room.memory["links"][this.id]["doOutput"] = false;
        }
    };

    Object.defineProperty(StructureLink.prototype, "doOutput", {
        get: function() {
            return this.room.memory["links"][this.id]["doOutput"];
        },
        enumerable: true,
        configureable: false
    });
}