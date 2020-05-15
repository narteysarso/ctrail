const ratingFactory = function({Id, sanitize}){
    return function makeRating({
        id = Id.makeId(),
        note,
        stars,
        author,
        createdAt = Date.now(),
        updatedAt = Date.now(),
        deletedAt
    }){
        if (!id)
            throw new Error('Rating must have a valid id');

        if (!stars)
            throw new Error('Rating must have a name');
        
        
        if (!author)
            throw new Error('Rating must have a valid author');

        sanitizeText = sanitize(note);

        if(note && !sanitizeText)
            throw new Error("No usable note made");

        return Object.freeze({
            getId: () => id,
            getNote: () => note,
            getStars:() => stars,
            getDeletedAt: () => deletedAt,
            getCreatedAt: () => createdAt,
            getUpdatedAt: () => updatedAt,
            getAuthor: () => author,
            markDeleted: () => {
                deletedAt = Date.now()
            },
        })
    }
}

module.exports = ratingFactory