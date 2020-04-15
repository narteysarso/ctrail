const makeTokensDB = require("./token-db");
const makeDB = require("../db");

const tokensDb = makeTokensDB({ makeDB });
module.exports = { tokensDb }