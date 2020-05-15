const makeAddService = require ('./add-service')
const makeEditService = require ('./edit-service')
const makeRemoveService = require ('./remove-service')
const makeListServices = require ('./list-services')
const makeListOpenServices = require ('./list-open-services')
const makeCountServices = require('./count-services')
const makeFindService = require('./find-service')
const makeFindServiceByPointId = require('./find-service-by-point-id');
const servicesDb = require ('../../db/service');

const addService = makeAddService({ servicesDb})
const editService = makeEditService({ servicesDb})
const listServices = makeListServices({ servicesDb })
const listOpenServices = makeListOpenServices({ servicesDb })
const removeService = makeRemoveService({ servicesDb })
const countServices = makeCountServices({servicesDb});
const findOneService = makeFindService({servicesDb});
const findServiceByPointId = makeFindServiceByPointId({servicesDb});

module.exports = { addService, editService, listServices, removeService , countServices, listOpenServices, findOneService, findServiceByPointId}
