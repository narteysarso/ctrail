const makeAddPoint = require ('./add-point')
const makeEditPoint = require ('./edit-point')
const makeRemovePoint = require ('./remove-point')
const makeListPoints = require ('./list-points')
const makeCountPoints = require('./count-points');
const makeFindPointById = require('./find-point');
const makeFindClosestPoint = require('./find-closest-point');
const makeFindPointsByAuthorId = require('./find-point-by-author');
const pointsDb = require ('../../db/point');

const addPoint = makeAddPoint({ pointsDb})
const editPoint = makeEditPoint({ pointsDb})
const listPoints = makeListPoints({ pointsDb })
const removePoint = makeRemovePoint({ pointsDb })
const countPoints = makeCountPoints({pointsDb});
const findOnePoint = makeFindPointById({pointsDb});
const findClosestPoint = makeFindClosestPoint({pointsDb});
const findPointsByAuthorId = makeFindPointsByAuthorId({pointsDb});

module.exports = { addPoint, editPoint, findPointsByAuthorId, listPoints, removePoint , countPoints, findOnePoint, findClosestPoint}
