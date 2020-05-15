module.exports = function makeListClients({usersDb}){

    return async function(query){
        query = query ? query : {};
        const users = await usersDb.findAll({...query, type: 'client'});

        return users;
    }
}
