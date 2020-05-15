module.exports = function makeCountUser({ usersDb }) {

    return async function (query) {
        try {
            query = query ? query : {};
            const count = await usersDb.countData({...query, type: 'client'});
            
            return count;
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }

}
