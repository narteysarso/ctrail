
const { authenticate, makeToken, ROLES } = require('../../utils');

module.exports = function makeAddLogin({ usersDb }) {
    return async function login(userInfo = {}) {

        if (!userInfo.username && !userInfo.password){

            let error = new Error("No authentication data");
            error.statusCode = 404;
            throw error;
        }

        const user = (await usersDb.findByEmailAndPhone({$or: [{ email: userInfo.username }, { phone: userInfo.username }] }))[0];

        
        
        if (!user){
            let error = new Error("User does not exist");
            error.statusCode = 404;
            throw error
        }
            

        //check for password match
        const authResult = await authenticate(userInfo.password, user.password)
        if(!authResult){
            let error = new Error("Invalid credentials");
            error.statusCode = 500;
            throw error;
        }
        
        const {password, roleId, ...rest} = user;
        const role = getRoleKey(roleId);
        
        //make authentication token
        const token = makeToken({...rest, roleId});

        return {token, ...rest, role};
    }
}

function getRoleKey(roleId){
    for (let key in ROLES) {
        if (ROLES[key] === roleId)
            return key;
    }
}