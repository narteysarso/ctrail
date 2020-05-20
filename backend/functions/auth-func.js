const {login, invalidateToken, isInvalidatedToken, listUsers, editUser} = require('../use-cases');
const {verifyToken, verifyExpiredToken, decodeToken, makeToken, makePasswordHash, ROLES} = require("../utils")

/**
 * @async
 * @name signIn
 * @description Sign user in
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.signIn = async (event, context, callback) =>{
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!event.body)
            throw ("No data submitted");
        
        
        const result = await login(JSON.parse(event.body));
        const {registerToken, ...userInfo} = result;

        callback(null, {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo)
        });
    } catch (err) {
        console.log(err);
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"message":err.message})
        });
    }

}

/**
 * @async
 * @name signOut
 * @description Sign user out
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.signOut = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{
        
        const authBearer = event.headers['Authorization'] || event.headers['authorization'];
        
        const token = await verifyToken(authBearer);
        
        await isInvalidatedToken(token);
        
        const result = invalidateToken(token);
        if(!result){
            const error = new Error("Logout failed");
            error.statusCode = 500;
            throw error;

        }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({token})
        });

    }catch(err){
        console.log(err);
        callback(null, {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({"message": err.message})
        });
    }

}

/**
 * @async
 * @name setupTokenVerify
 * @description assigns a setup token for user based on register token
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.setupTokenVerify = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try{

        const authBearer = event.headers['Authorization'];
        
        const token = verifyToken(authBearer);
        
        await isInvalidatedToken(token);
        
        //TODO: verify setup token
        const user = (await listUsers({registerToken: token}))[0];

        const roleId = ROLES[user['role']]
        
        if(!user){
            const error = new Error("Account set up failed");
            error.statusCode = 400;
            throw error;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ token: makeToken({...user, roleId}, "0.25h"),  "message": "token verified" })
        });
        
    }catch(err){
        console.log(err);
        callback(null, {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({"message": err.message})
        });
    }
}


/**
 * @async
 * @name setupPassword
 * @description setup password for first time upon registration
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.setupPassword = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!event.body)
            throw ("No data submitted");
        
        const authBearer = event.headers['Authorization'] || event.headers['authorization'];

        const token = await verifyToken(authBearer);
        const decodedToken = await decodeToken(token);
        const body = JSON.parse(event.body);
        // invalidateToken(token);

        if(body['password'] !== body['confirm_password']){
            const error = new Error("Passwords do not match");
            error.statusCode = 400;
            throw error;
        }

        const updatedUser = await editUser({id: decodedToken['id'], password: await makePasswordHash(body['password'])});

        if(!updatedUser){
            const error = new Error("Unable to set user password.");
            error.statusCode = 500;
            throw error;
        }
        
        const result = await login({username : decodedToken['email'] || decodedToken['phone'], password: body['password']});

        invalidateToken(token);
        invalidateToken(result['registerToken']);
    
        callback(null, {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result)
        });
    } catch (err) {
        console.log(err);
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": err.message })
        })
    }

}

/**
 * @async
 * @name signOut
 * @description Sign user out
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.renewExpiredToken = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        const authBearer = event.headers['Authorization'] || event.headers['authorization'];

        const token = await verifyExpiredToken(authBearer);
        const decodedToken = decodeToken(token);
        await isInvalidatedToken(token);

        const result = invalidateToken(token);
        if (!result) {
            const error = new Error("Token invalidation failed");
            error.statusCode = 500;
            throw error;

        }

        const newToken = makeToken(decodedToken);
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({token: newToken})
        });

    } catch (err) {
        console.log(err);
        callback(null, {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({ "message": err.message })
        });
    }

}

