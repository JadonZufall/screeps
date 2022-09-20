const managerCreep = require("managerCreep");
const managerConstruct = require("managerConstruct");

module.exports = {
    run: function() {
        let visibleRooms = Game.rooms;
        for (let index in visibleRooms) {
            let targetRoom = visibleRooms[index];
            managerCreep.run(targetRoom);
            managerConstruct.run(targetRoom);
        }
    }
}