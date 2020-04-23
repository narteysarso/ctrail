const makeService = require("../../models/Service");

module.exports = function makeAddService({ servicesDb }) {
    return async function addService(serviceInfo = {}) {
        // console.log(servicesDb)
        const service = makeService({...serviceInfo});

        //TODO: make policy implementations. eg: check authorization
        const exists = await servicesDb.findById(service.getId());
        if (exists)
            return exists;

        return servicesDb.insert({
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
            createdAt: service.getCreatedAt(),
            id: service.getId(),
        });
    }
}