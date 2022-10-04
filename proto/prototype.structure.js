module.exports = function() {
    Structure.prototype.update = function() {

    };

    Object.defineProperty(Structure.prototype, "isStorage", {
        get: function() {
            return this.hasOwnProperty("store");
        },
        enumerable: true,
        configureable: false
    });
}