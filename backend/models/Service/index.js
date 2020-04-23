const { Id, sanitize} = require('../../utils');
const serviceFactory = require('./Service');

const makeService = serviceFactory({Id, sanitize});

module.exports = makeService;