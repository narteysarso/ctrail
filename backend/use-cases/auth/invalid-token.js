const {verifyToken} = require('../../utils');

function makeInvalidToken({tokensDb}){

    return async function invalidToken(token){
        try {
            if (!token) {
                const error = new Error("Invalid token");
                error.statusCode = 400;
                throw error;
            }

            const exist = (await tokensDb.findAll({ token }))[0];
            
            if (exist)
                return exist;

            const result = await tokensDb.insert({ token : token});


            if (result)
                return result;
            return null;
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }

}

function checkTokenValidity({tokensDb}) {
    return async function isInvalidatedToken(token) {
        try {
            
            if (!token) {
                const error = new Error("Invalid token");
                error.statusCode = 400;
                throw error;
            }
    
            const exist = (await tokensDb.findAll({ token }))[0];
            
            if (exist){
                const error = new Error("Unauthorized");
                error.statusCode = 401;
                throw error;
            }
    
            return true;
        } catch (error) {
            error.statusCode = error.statusCode || 500;
            throw error;   
        }
    }

}

module.exports = {
    makeInvalidToken,
    checkTokenValidity
}