const pointFactory = function({Id, sanitize}){
    return function makePoint({
        id = Id.makeId(),
        name,
        code,
        longitude,
        latitude,
        tags,
        movable = false,
        description,
        overseer,
        overseerPhone,
        authorId,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt
    }){
        if (!id)
            throw new Error('Point must have a valid id');

        if (!name)
            throw new Error('Point must have a name');
        
        if (!code)
            throw new Error('Point must have a ussd code');

        if (!longitude)
            throw new Error('Point must have longitude');
        
        if (!latitude)
            throw new Error('Point must have latitude');
        
        if (!authorId)
            throw new Error('Point must have a valid author id');

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
            getLongitude: () => longitude,
            getLatitude: () => latitude,
            isMovable: () => movable,
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

module.exports = pointFactory