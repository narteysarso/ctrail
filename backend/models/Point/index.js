const { Id, sanitize} = require('../../utils');
const pointFactory = require('./Point');

const makePoint = pointFactory({Id, sanitize});

module.exports = makePoint;