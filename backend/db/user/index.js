const makeUsersDB  = require("./user-db");
const makeDB  = require("../db");

const usersDb = makeUsersDB({ makeDB });
module.exports = {usersDb}