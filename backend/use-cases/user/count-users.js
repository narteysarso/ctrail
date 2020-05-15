module.exports = function makeCountClients({ usersDb }) {

    return async function (query) {
        try {
            query = query ? query : {};
            const count = await usersDb.countData({...query, type: 'user'});
            
            return count;
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }

}
