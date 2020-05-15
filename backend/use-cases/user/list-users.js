module.exports = function makeListUsers({usersDb}){

    return async function(query){
        query = query ? query : {};
        const users = await usersDb.findAll({...query, type: 'user'});

        return users;
    }
}
