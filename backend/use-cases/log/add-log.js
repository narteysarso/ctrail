const {makeLog} = require("../../models");

module.exports = function makeAddLog({ logsDb}) {
    return async function addLog(logInfo = {}) {
        const log = makeLog(logInfo);

        //TODO: make policy implementations. eg: check authorization

        const exists = await logsDb.findById(log.getId());
        if (exists)
            return exists;
        
        return logsDb.insert({
            phone: log.getPhone(),
            pointId: log.getPointId(),
            createdAt: log.getCreatedAt(),
            updatedAt: log.getUpdatedAt(),
            id: log.getId(),
    
        });
    }
}