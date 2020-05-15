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
            price: service.getPrice(),
            rating: service.getRating(),
            day: service.getDay(),
            openTime: service.getOpenTime(),
            closeTime: service.getCloseTime(),
            description: service.getDescription(),
            currency: service.getCurrency(),
            availability: service.getAvailability(),
            authorId: service.getAuthorId(),
            pointId: service.getPointId(),
            verified: service.isVerified(),
            available: service.isAvailable(),
            tags: service.getTags(),
            createdAt: service.getCreatedAt(),
            id: service.getId(),
        });
    }
}