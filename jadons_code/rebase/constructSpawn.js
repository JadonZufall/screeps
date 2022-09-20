module.exports = {
    run: function(targetSpawn) {
        if (targetSpawn.spawning) {
            return null;
        }
    }
}