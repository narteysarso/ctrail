const serviceFactory = function({Id, sanitize}){
    return function makeService({
        id = Id.makeId(),
        name,
        verified = false,
        openTime,
        closeTime,
        tags,
        rating,
        description,
        available,
        availability,
        day,
        pointId,
        price,
        currency,
        authorId,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt
    }){
        if (!id)
            throw new Error('Service must have a valid id');

        if (!name)
            throw new Error('Service must have a name');

        if (!authorId)
            throw new Error('Service must have a valid author id');
        
        if (!pointId)
            throw new Error('Service must have a belong to a tracking point id');
        

        sanitizeText = sanitize(description);

        if(description && !sanitizeText)
            throw new Error("No usable description");

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getTags: () => tags,
            getPrice: () => price,
            getPointId: () => pointId,
            getRating: () => rating,
            isVerified: () => verified,
            isAvailable: () => available,
            getDay: () => day,
            getAvailability: () => availability,
            getCurrency: () => currency,
            getOpenTime: () => openTime,
            getCloseTime: () => closeTime,
            getDescription: () => description,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            getAuthorId: () => authorId,
            markDeleted: () => {
                deletedAt = Date.now()
            },
        })
    }
}

module.exports = serviceFactory