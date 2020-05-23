const {addPoint, countPoints, findPointsByAuthorId, listPoints,removePoint, editPoint, findClosestPoint} = require("../use-cases/point/");
const { verifyToken, decodeToken, verifyPointPermission, extractUSSDCodeFromPhoneNumber } = require("../utils")
/**
 * @async
 * @name createPoint
 * @description creates a new tracking point
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.createPoint = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!event.body)
            throw ("No data submitted");
        const authBearer = event.headers['Authorization'] || event.headers['authorization'];
        const token = await verifyToken(authBearer);
        const decodedToken = decodeToken(token)
        const pointObject = JSON.parse(event.body);
        
        const code = extractUSSDCodeFromPhoneNumber(pointObject['phone'] || pointObject['overseerPhone']);
        const result = await addPoint({...pointObject,code, authorId: decodedToken['id']});

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({"data": result, "message": "Tracking point added"})
        });
    } catch (err) {
        console.log(err)
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err)
        })
    }

};

module.exports.editPoint = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!event.body)
            throw ("No data submitted");
        const authBearer = event.headers['Authorization'] || event.headers['authorization']
        const pointObject = JSON.parse(event.body);
        const token = await verifyToken(authBearer);
        const decodedToken = decodeToken(token);

        const point = await listPoints({id: pointObject.id});
        
        verifyPointPermission({userId:decodedToken['id'], userRole:decodedToken['role'], pointAuthor:point.authorId});

        const result = await editPoint({authorId: decodedToken['id'], ...pointObject });

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({"data": result, "message": "Tracking point updated"})
        });
    } catch (err) {
        console.log(err)
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err)
        })
    }

};

module.exports.getPoints = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        
        const data = event.queryStringParameters;
        data['skip'] = parseInt(data['skip']);
        data['limit'] = parseInt(data['limit']);
        const token = await verifyToken(event.headers['Authorization']);
        
        const dataCount = await countPoints();
        data['deletedAt'] = null;
        const result = await listPoints(( data ? data: {} ));
        let message = "";
        let statusCode = 200;
        if(result.length < 1){
            message = "No tracking point added";
            statusCode = 404;
        }
    
        callback(null, {
            statusCode,
            body: JSON.stringify({ dataCount, "data": result, message })
        });
        
    } catch (error) {
        console.log(error);
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        }); 
    }
};

module.exports.getMyPoints = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        const data = [];
        const authBearer = event.headers['Authorization'] || event.headers['authorization'];
        const token = await verifyToken(authBearer);
        const decodedToken = decodeToken(token);

        const dataCount = await countPoints();
        data['deletedAt'] = null;
        data['authorId'] = decodedToken['id'];
        const result = await findPointsByAuthorId((data ? data : {}));
        let message = "";
        let statusCode = 200;
        if (result.length < 1) {
            message = "No tracking point added";
            statusCode = 404;
        }

        callback(null, {
            statusCode,
            body: JSON.stringify({ dataCount, "data": result, message })
        });

    } catch (error) {
        console.log(error);
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        });
    }
};

module.exports.searchPoints = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        
        const query = event.queryStringParameters;
        
        const token = await verifyToken(event.headers['Authorization']);
        
        const result = await listPoints(({ $text:{$search: query['keyword']}}));

        let message = "";
        let statusCode = 200;
        if(result.length < 1){
            message = "No tracking point found";
            statusCode = 404;
        }
        const filteredResult = result.filter((point) => !point.deletedAt)
    
        callback(null, {
            statusCode,
            body: JSON.stringify({ "data": filteredResult, message })
        });
        
    } catch (error) {
        // console.log(error);
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        }); 
    }
};

module.exports.findClosestPoints = async (event,context, callback)=> {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const {lat:latitude, long:longitude, searchtext = ''} = event.queryStringParameters;
        // const authBearer = event.headers['Authorization'] || event.headers['authorization'];
        // const token = await verifyToken(authBearer);

        const result = await findClosestPoint({ 
            latitude, 
            longitude,
            searchtext, 
            deletedAt: null
        });

        let message = "";
        let statusCode = 200;
        if (result.length < 1) {
            message = "No tracking point found";
            statusCode = 404;
        }

        callback(null, {
            statusCode,
            body: JSON.stringify({ "data": result, message })
        });
    } catch (error) {
        console.log(error);
        callback(null, {
            statusCode: error.statusCode || 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "message": error.message })
        }); 
    }
};

module.exports.removePoint = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        
        const {id} = event.pathParameters;
        const authBearer = event.headers['Authorization'] || event.headers['authorization'];
        const token = await verifyToken(authBearer);
        const decodedToken = decodeToken(token);

        const point = await listPoints({ id });
        
        verifyPointPermission({userId:decodedToken['id'], userRole:decodedToken['role'], pointAuthor:point.authorId});

        const result = await removePoint({id});
        let message = "Tracking point removed";
        let statusCode = 200;
        if(result.length < 1){
            message = "No tracking point found";
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
};