const makeAddPoint = require ('./add-point')
const makeEditPoint = require ('./edit-point')
const makeRemovePoint = require ('./remove-point')
const makeListPoints = require ('./list-points')
const makeCountPoints = require('./count-points')
const pointsDb = require ('../../db/point');

const addPoint = makeAddPoint({ pointsDb})
const editPoint = makeEditPoint({ pointsDb})
const listPoints = makeListPoints({ pointsDb })
const removePoint = makeRemovePoint({ pointsDb })
const countPoints = makeCountPoints({pointsDb});

module.exports = { addPoint, editPoint, listPoints, removePoint , countPoints}
