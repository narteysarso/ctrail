module.exports = function makeFindClosestPoint({ pointsDb }) {

    return async function (query) {
        try {
            query = query ? query : {}
            const point = await pointsDb.closestLocation(query);

            return point;
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }

}
