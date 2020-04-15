module.exports = function makeCountPoints({ pointsDb }) {

    return async function (query) {
        try {
            query = query ? query : {};
            const count = await pointsDb.countData(query);
            
            return count;
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }

}
