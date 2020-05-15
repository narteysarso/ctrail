const makeService = require("../../models/Service");
module.exports = function makeRemoveService({ servicesDb }) {
    return async function removeService({ id } = {}) {

        if (!id) {
            throw new Error('You must supply a service id.')
        }

        const serviceToDelete = await servicesDb.findById({ id })
    
        if(!serviceToDelete){
            const error = new Error("Service not found");
            error.statusCode = 404;
            throw error;
        }

        return softDelete(serviceToDelete)
    }

    async function softDelete(serviceInfo) {
        const toDelete = makeService(serviceInfo)
        toDelete.markDeleted()
        await servicesDb.update({
            name: toDelete.getName(),
            price: toDelete.getPrice(),
            rating: toDelete.getRating(),
            day: toDelete.getDay(),
            openTime: toDelete.getOpenTime(),
            closeTime: toDelete.getCloseTime(),
            description: toDelete.getDescription(),
            currency: toDelete.getCurrency(),
            availability: toDelete.getAvailability(),
            authorId: toDelete.getAuthorId(),
            pointId: toDelete.getPointId(),
            verified: toDelete.isVerified(),
            available: toDelete.isAvailable(),
            tags: toDelete.getTags(),
            createdAt: toDelete.getCreatedAt(),
            updatedAt: toDelete.getUpdatedAt(),
            deletedAt: toDelete.getDeletedAt(),
            id: toDelete.getId(),
        });
        
        return {
            deletedCount: 1,
            softDelete: true,
            message: 'Rating has been soft deleted.'
        }
    }

    a
}
