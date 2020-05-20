const makePoint = require("../../models/Point");
module.exports = function makeRemovePoint({ pointsDb }) {
    return async function removePoint({ id } = {}) {

        if (!id) {
            throw new Error('You must supply a point id.')
        }

        const pointToDelete = await pointsDb.findById({ id })
    
        if(!pointToDelete){
            const error = new Error("Tracking point not found");
            error.statusCode = 404;
            throw error;
        }

        return softDelete(pointToDelete)
    }

    async function softDelete(pointInfo) {
        const toDelete = makePoint(pointInfo)
        toDelete.markDeleted()
        await pointsDb.update({
            id: toDelete.getId(),
            name: toDelete.getName(),
            imageUri: toDelete.getImageUri(),
            description: toDelete.getDescription(),
            isMovable: toDelete.isMovable(),
            longitude: toDelete.getLongitude(),
            latitude: toDelete.getLatitude(),
            authorId: toDelete.getAuthorId(),
            tags: toDelete.getTags(),
            loc: toDelete.getLoc(),
            deletedAt: toDelete.getDeletedAt(),
            createdAt: toDelete.getCreatedAt(),
            updatedAt: toDelete.getUpdatedAt()
        });
        
        return {
            deletedCount: 1,
            softDelete: true,
            message: 'Point has been soft deleted.'
        }
    }

    a
}
