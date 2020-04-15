module.exports = function makeListUsers({usersDb}){

    return async function(query){
        query = query ? query : {};
        const users = await usersDb.findAll(query);

        return users;
    }
}
