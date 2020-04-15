const makeLog = require("../../models");

module.exports = function makeEditLog({ logsDb}) {
    return async function editLog({ id, ...changes } = {}) {
        if (!id) {
            throw new Error('You must supply an id.')
        }
        
        const existing = await logsDb.findById({ id })

        if (!existing) {
            throw new RangeError('Log not found.')
        }
        const log = makeLog({ ...existing, ...changes, modifiedOn: null })
        
        const updated = await logsDb.update({
           ...log
        });

        return { ...existing, ...updated }
    }
}
