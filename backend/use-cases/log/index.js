const  makeAddLog = require('./add-log');
const  makeEditLog = require('./edit-log');
const  makeRemoveLog = require('./remove-log');
const  makeListLogs = require('./list-logs');
const makePhoneNumberAggregate = require('./phoneNumber-aggregate');
const makeContactAggregate = require('./trace-contact-aggregate');
const  {logsDb} = require('../../db');

const addLog = makeAddLog({ logsDb })
const editLog = makeEditLog({ logsDb })
const listLogs = makeListLogs({ logsDb })
const removeLog = makeRemoveLog({ logsDb })
const contactAggregate = makeContactAggregate({logsDb})
const phoneNumberAggregate = makePhoneNumberAggregate({logsDb});


module.exports = { addLog, editLog, listLogs, removeLog, phoneNumberAggregate, contactAggregate }
