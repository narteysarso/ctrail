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
            category:point.getCategory(),
            overseer: point.getOverseer(),
            imageUri: point.getImageUri(),
            overseerPhone: point.getOverseerPhone(),
            email: point.getEmail(),
            services: point.getServices(),
            phone: point.getPhone(),
            longitude: point.getLongitude(),
            latitude: point.getLatitude(),
            description: point.getDescription(),
            authorId: point.getAuthorId(),
            isMovable: point.isMovable(),
            tags: point.getTags(),
            loc: point.getLoc(),
            createdAt: point.getCreatedAt(),
            id: point.getId(),
    
        });
    }
}