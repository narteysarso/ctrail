const makeLogsDB  = require("./log-db");
const makeDB  = require("../db");

const logsDb = makeLogsDB({ makeDB });
module.exports = {logsDb};