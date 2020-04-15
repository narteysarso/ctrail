module.exports = function makePhoneNumberAggregate({ logsDb }) {
    return async function phoneNumberAggregate({ phone, startDate, endDate} = {}) {
        if (!phone) {
            throw new Error('You must supply an phone number.')
        }
        if (!startDate) {
            throw new Error('You must supply starting date.')
        }
        if (!endDate) {
            throw new Error('You must supply ending date.')
        }

        const results = await logsDb.phoneNumberAggregate({phone, startDate, endDate});


        return results
    }
}
