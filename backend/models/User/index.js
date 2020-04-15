const {Id, ROLES, validator} = require('../../utils');
const userFactory = require('./User');

const makeUser = userFactory({Id,ROLES, validator});

module.exports = {makeUser};