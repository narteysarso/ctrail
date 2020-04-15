const { Id } = require('../../utils');
const logFactory = require('./Log');

const makeLog = logFactory({Id});

module.exports ={ makeLog};