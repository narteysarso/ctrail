const makeService = require("../../models/Service");

module.exports = function makeEditService({ servicesDb}) {
    return async function editService({ id, ...changes } = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        
        const existing = await servicesDb.findById({ id })

        if (!existing) {
            throw new Error('Service not found.')
        }
        const service = makeService({ ...existing, ...changes, modifiedOn: null })
        
        const updated = await servicesDb.update({
            name: service.getName(),
            code: service.getCode(),
            price: service.getPrice(),
            day: service.getDay(),
            openTime: service.getOpenTime(),
            closeTime: service.getCloseTime(),
            description: service.getDescription(),
            authorId: service.getAuthorId(),
            point: service.getPoint(),
            verified: service.isVerified(),
            available: service.isAvailable(),
            tags: service.getTags(),
            updatedAt: service.getUpdatedAt(),
            id: service.getId(),
        });

        return { ...existing, ...updated }
    }
}
