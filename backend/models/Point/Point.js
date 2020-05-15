const pointFactory = function({Id, sanitize}){
    return function makePoint({
        id = Id.makeId(),
        name,
        code,
        longitude,
        latitude,
        phone,
        email,
        tags,
        movable = false,
        isOpen = false,
        description,
        imageUri,
        overseer,
        category,
        overseerPhone,
        services = [],
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
        
        const loc = { type: 'Point', coordinates: [longitude, latitude] }

        return Object.freeze({
            getId: () => id,
            getName: () => name,
            getOverseer:() => overseer,
            getOverseerPhone: () => overseerPhone,
            getTags: () => tags,
            getImageUri: () => imageUri,
            getCode: () => code,
            isOpen: () => isOpen,
            getLongitude: () => longitude,
            getLatitude: () => latitude,
            getPhone: () => phone,
            getEmail: () => email,
            getCategory: () => category,
            getServices: () => services,
            isMovable: () => movable,
            getDescription: () => sanitizeText,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            getAuthorId: () => authorId,
            getLoc:() => loc,
            markDeleted: () => {
                deletedAt = Date.now()
            },
        })
    }
}

module.exports = pointFactory