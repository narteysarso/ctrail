const {addUser, login, editUser, listUsers, findAllByIdExcept,countUsers, removeUser} = require('../use-cases');
const { mail, verifyToken, makePasswordHash, decodeToken, ROLES, makeRegistrationToken, verifyPermission,getRoleKey } = require("../utils")

/**
 * @async
 * @name createUser
 * @description Creates a new user
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.createUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        if (!event.body)
            throw ("No data submitted");

        const token = await verifyToken(event.headers['Authorization']);
        const decodedToken = decodeToken(token)
        const userRole = decodedToken['roleId'];

        verifyPermission(userRole);

        const data = JSON.parse(event.body);

        const searchResult = await listUsers({$or : [{email: data.email},{phone: data.phone}]});

        if(searchResult.length){
            const error = new Error("Already email and phone already taken");
            error.statusCode = 400;
            throw error;
        }

        const roleId = ROLES[data['role']];

        if(!roleId){
            const error = new Error("Failed to add user");
            error.statusCode = 400;
            throw error;
        }

        const registerToken = makeRegistrationToken({ ...data, roleId });
        const result = await addUser({...data, roleId, registerToken });

        if(!result){
            const error = new Error("Failed to add user");
            error.statusCode = 500;
            throw error;
        }
        const {role, roleId:role_Id, ...userInfo} = {role: getRoleKey (result['roleId']), ...result};
        mail({
            to: `${result['email']}`,
            subject:"CTrail App IV",
            html:`<h1>CTrail App IV</h1>
                <p> You have invited to use the CTrail application by ${decodedToken['email']}.</p>
                <p> Kindly <a href="${process.env.SET_ACCOUNT_ENDPOINT}/${registerToken}">complete you registration here.</a> 
            `
        });
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({data: {...userInfo, role}, message: "User added"})
        });

    }catch(error) {
        console.log(error)
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        });
    }

}


// module.exports.registerUser = async (event, context, callback) => {
//     context.callbackWaitsForEmptyEventLoop = false;

//     try {

//         if (!event.body)
//             throw ("No data submitted");


//         const data = JSON.parse(event.body);

//         const searchResult = await listUsers({$or : [{email: data.email},{phone: data.phone}]});

//         if(searchResult.length){
//             const error = new Error("Already email and phone already taken");
//             error.statusCode = 400;
//             throw error;
//         }

//         const roleId = ROLES["OWNER"];

//         if(!roleId){
//             const error = new Error("Failed to add user");
//             error.statusCode = 400;
//             throw error;
//         }

//         const passwordHash = await makePasswordHash(data.password);

//         const result = await addUser({...data, roleId, passwordHash});

//         if(!result){
//             const error = new Error("Failed to add user");
//             error.statusCode = 500;
//             throw error;
//         }

//         callback(null, {
//             statusCode: 200,
//             body: JSON.stringify({data: result, message: "User registered"})
//         });

//     }catch(error) {
//         console.log(error)
//         callback(null, {
//             statusCode: error.statusCode || 500,
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ "message": error.message })
//         });
//     }

// }


/**
 * @async
 * @name changePassword
 * @description Change password
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.changePassword = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    try {

        const token = await verifyToken(event.headers['Authorization']);
        const decodedToken = decodeToken(token)
        const { username, oldpassword, newpassword, confirm } = JSON.parse(event.body);
        
        if(username !== decodedToken['email'] && username !== decodedToken['phone']){
            const error = new Error("Wrong username");
            error.statusCode = 401;
            throw error;
        }

        const loginResult = await login({username, password: oldpassword});

        if(!loginResult){
            const error = new Error("Invalid credentials. Password change failed");
            error.statusCode = 401;
            throw error;
        }

        if(newpassword !== confirm){
            const error = new Error("New passwords do not match.");
            error.statusCode = 400;
            throw error
        }

        const hashedPassword = await makePasswordHash(newpassword);
        

        const editResult = await editUser({id: loginResult.id, password: hashedPassword});

        if(!editResult){
            const error = new Error("Operation failed");
            error.statusCode = 500;
            throw error;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ "message":"password updated"})
        });

    } catch (error) {
        console.log(error);
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"message": error.message})
        })
    }

}

/**
 * @async
 * @name updateUser
 * @description Change password
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.updateUser = async (event,context,callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const token = await verifyToken(event.headers['Authorization']);
        const decodedToken = decodeToken(token)
        const {email, name, phone} = JSON.parse(event.body);
       
        const editResult = await editUser({ id: decodedToken.id, email, name, phone });

        if (!editResult) {
            const error = new Error("Operation failed");
            error.statusCode = 500;
            throw error;
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({"data": editResult, "message": "user updated" })
        });

    } catch (error) {
        // console.log(error); 
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        });  
    }
}

module.exports.getUsers = async (event,context,callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const token = await verifyToken(event.headers['Authorization']);
        const decodedToken = decodeToken(token)

        verifyPermission(decodedToken['roleId']);
        const dataCount = await countUsers();
        const result = await findAllByIdExcept({id: decodedToken['id'], deletedAt: null});
        if (result.length < 1) {
            message = "No tracking user added";
            statusCode = 404;
        }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({dataCount, "data": result, "message": "" })
        });

    } catch (error) {
        console.log(error); 
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        });  
    }
}

module.exports.removeUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        const { id } = event.pathParameters;

        const token = await verifyToken(event.headers['Authorization']);
        const decodedToken = decodeToken(token);
        const userRole = decodedToken['roleId'];

        verifyPermission(userRole);
        const result = await removeUser({ id });
        let message = "User removed";
        let statusCode = 200;
        if (result.length < 1) {
            message = "No user found";
            statusCode = 404;
        }

        callback(null, {
            statusCode,
            body: JSON.stringify({ data: result, message })
        });

    } catch (error) {
        console.log(error);
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        });
    }
}

module.exports.searchUsers = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        const query = event.queryStringParameters;

        const token = await verifyToken(event.headers['Authorization']);
        const roleId = ROLES[(query['keyword'].toUpperCase()).trim()]
        if(roleId)
            query['keyword'] += ` ${roleId}`;
        const result = await listUsers(({ $text: { $search: query['keyword'] } }));

        let message = "";
        let statusCode = 200;
        if (result.length < 1) {
            message = "No user found";
            statusCode = 404;
        }
        const filteredResult = result.filter((user) => !user.deletedAt)

        callback(null, {
            statusCode,
            body: JSON.stringify({ "data": filteredResult, message })
        });

    } catch (error) {
        console.log(error);
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        });
    }
}