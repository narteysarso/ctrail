module.exports = function makeListLogs({logsDb}){

    return async function(query){
        query = query ? query : {};
        const logs = await logsDb.findAll(query);

        return logs;
    }
}
