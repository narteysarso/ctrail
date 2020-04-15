const logFactory = function({Id}){
    return function makeLog({
        id = Id.makeId(),
        phone,
        pointId,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt
    }){
        if (!Id.isValidId(id))
            throw new Error('Log must have an id');

        if (!phone)
            throw new Error('Log must have a phone');

        if (!pointId)
            throw new Error('Log must have point id');

        return Object.freeze({
            getId: () => id,
            getPointId: () => pointId,
            getPhone: () => phone,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            markDeleted: () => {
                deletedAt = Date.now()
            },
        })
    }
}

module.exports = logFactory