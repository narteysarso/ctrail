const makeAuthLogin = require("./login");
const {makeInvalidToken, checkTokenValidity} = require('./invalid-token');
const {usersDb, tokensDb} = require('../../db');

const login = makeAuthLogin({usersDb});
const invalidateToken = makeInvalidToken({tokensDb}); 
const isInvalidatedToken = checkTokenValidity({tokensDb})

module.exports = { login ,invalidateToken , isInvalidatedToken}