const serviceFactory = function({Id, sanitize}){
    return function makeService({
        id = Id.makeId(),
        name,
        code,
        verified = false,
        openTime,
        closeTime,
        tags,
        description,
        available,
        day,
        point,
        price,
        authorId,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt
    }){
        if (!id)
            throw new Error('Service must have a valid id');

        if (!name)
            throw new Error('Service must have a name');
        
        if (!code)
            throw new Error('Service must have a ussd code');

        if (!authorId)
            throw new Error('Service must have a valid author id');

        sanitizeText = sanitize(description);

        if(description && !sanitizeText)
            throw new Error("No usable description");

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getOverseer:() => overseer,
            getOverseerPhone: () => overseerPhone,
            getTags: () => tags,
            getCode: () => code,
            getPrice: () => price,
            getPoint: () => point,
            isVerified: () => verified,
            isAvailable: () => available,
            getDay: () => day,
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