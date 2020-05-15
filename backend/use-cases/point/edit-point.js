const makePoint = require("../../models/Point");

module.exports = function makeEditPoint({ pointsDb}) {
    return async function editPoint({ id, ...changes } = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        
        const existing = await pointsDb.findById({ id })

        if (!existing) {
            throw new RangeError('Point not found.')
        }
        
        const point = makePoint({ ...existing, ...changes, modifiedOn: null })
        
        const updated = await pointsDb.update({
            name: point.getName(),
            code: point.getCode(),
            imageUri: point.getImageUri(),
            overseer: point.getOverseer(),
            overseerPhone: point.getOverseerPhone(),
            services: point.getServices(),
            longitude: point.getLongitude(),
            latitude: point.getLatitude(),
            email: point.getEmail(),
            phone: point.getPhone(),
            loc: point.getLoc(),
            description: point.getDescription(),
            authorId: point.getAuthorId(),
            isMovable: point.isMovable(),
            tags: point.getTags(),
            updatedAt: point.getUpdatedAt(),
            id: point.getId(),
        });

        return { ...existing, ...updated }
    }
}
