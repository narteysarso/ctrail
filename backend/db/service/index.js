const makeServicesDB  = require("./service-db");
const makeDB  = require("../db");

const servicesDb = makeServicesDB({ makeDB });


module.exports = servicesDb;