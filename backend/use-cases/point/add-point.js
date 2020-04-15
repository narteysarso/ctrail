const makePoint = require("../../models/Point");

module.exports = function makeAddPoint({ pointsDb }) {
    return async function addPoint(pointInfo = {}) {
        // console.log(pointsDb)
        const point = makePoint({...pointInfo});

        //TODO: make policy implementations. eg: check authorization
        const exists = await pointsDb.findById(point.getId());
        if (exists)
            return exists;

        return pointsDb.insert({
            name: point.getName(),
            code: point.getCode(),
            overseer: point.getOverseer(),
            overseerPhone: point.getOverseerPhone(),
            longitude: point.getLongitude(),
            latitude: point.getLatitude(),
            description: point.getDescription(),
            authorId: point.getAuthorId(),
            isMovable: point.isMovable(),
            tags: point.getTags(),
            createdAt: point.getCreatedAt(),
            id: point.getId(),
    
        });
    }
}