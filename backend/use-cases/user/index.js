const makeAddUser = require('./add-user');
const makeEditUser = require('./edit-user');
const makeListUsers = require('./list-users');
const makeRemoveUser = require('./remove-user');
const makeFindAllByIdExcept = require('./find-all-expect');
const makeCountData = require('./count-users')


const {usersDb} = require('../../db');

const addUser = makeAddUser({ usersDb })
const editUser = makeEditUser({usersDb});
const listUsers = makeListUsers({usersDb});
const removeUser = makeRemoveUser({usersDb});
const findAllByIdExcept = makeFindAllByIdExcept({usersDb});
const countUsers = makeCountData({usersDb});

module.exports = { addUser, editUser, listUsers, removeUser, findAllByIdExcept, countUsers }
