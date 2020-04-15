const makeLog = require("../../models");

module.exports = function makeRemoveLog({ logsDb }) {
    return async function removeLog({ id } = {}) {
        if (!id) {
            throw new Error('You must supply a log id.')
        }

        const logToDelete = await logsDb.findById({ id })

       
        return softDelete(logToDelete)
    }

    async function softDelete(logInfo) {
        const toDelete = makeLog(logInfo)
        toDelete.markDeleted()
        await logsDb.update({
            id: toDelete.getId(),
            pointId: toDelete.pointId(),
            phone: toDelete.phone(),
            deletedAt: getDeletedAt(),
            createdAt: getCreatedAt(),
            updatedAt: getUpdatedAt()
        })
        return {
            deletedCount: 1,
            softDelete: true,
            message: 'Log has been soft deleted.'
        }
    }

    a
}
