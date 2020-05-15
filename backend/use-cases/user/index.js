const makeAddUser = require('./add-user');
const makeEditUser = require('./edit-user');
const makeListUsers = require('./list-users');
const makeListClients = require('./list-clients');
const makeRemoveUser = require('./remove-user');
const makeFindAllByIdExcept = require('./find-all-expect');
const makeCountData = require('./count-users')
const makeCountClient = require('./count-clients')


const {usersDb} = require('../../db');

const addUser = makeAddUser({ usersDb })
const editUser = makeEditUser({usersDb});
const listUsers = makeListUsers({usersDb});
const listClients = makeListClients({usersDb});
const removeUser = makeRemoveUser({usersDb});
const findAllByIdExcept = makeFindAllByIdExcept({usersDb});
const countUsers = makeCountData({usersDb});
const countClients = makeCountClient({usersDb});

module.exports = { addUser, editUser, listUsers, removeUser, findAllByIdExcept, countUsers, listClients, countClients }
