module.exports = function makeContactAggregate({ logsDb }) {
    return async function contactAggregate({ points, times, timeBias } = {}) {
        if (!points) {
            throw new Error('You must supply tracking points.')
        }
        if (!times) {
            throw new Error('You must supply tracking times.')
        }
        if (!timeBias) {
            throw new Error('You must supply tracking time bias.')
        }

        const results = await logsDb.contactAggregate({ points, times, timeBias });


        return results
    }
}
