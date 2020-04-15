const makePointsDB  = require("./point-db");
const makeDB  = require("../db");

const pointsDb = makePointsDB({ makeDB });


module.exports = pointsDb;