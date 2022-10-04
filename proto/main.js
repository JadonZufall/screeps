require("prototype.creep")();
require("prototype.room")();
require("prototype.source")();
require("prototype.structure")();
require("prototype.structureLink")();
require("prototype.structureTower")();


function main() {
    for (let [key, val] in Object.entries(Game.rooms)) {
        val.update();
    }
}


main();

