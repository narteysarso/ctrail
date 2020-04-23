module.exports = function makeCountServices({ servicesDb }) {

    return async function (query) {
        try {
            query = query ? query : {};
            const count = await servicesDb.countData(query);
            
            return count;
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }

}
