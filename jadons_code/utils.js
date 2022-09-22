module.exports = {
    calculateDistance(objectA, objectB) {
        return ((objectB.pos.x - objectA.pos.x)**2 + (objectB.pos.y - objectA.pos.y)**2)**0.5
    },
}