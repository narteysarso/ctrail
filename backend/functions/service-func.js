const {addService, countServices, findOneService, listServices,removeService, editService, findOnePoint, editPoint, findServiceByPointId} = require("../use-cases");
const { verifyToken, decodeToken, verifyServicePermission } = require("../utils")
/**
 * @async
 * @name createService
 * @description creates a new  service
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.createService = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!event.body)
            throw ("No data submitted");
        const authBearer = event.headers['Authorization'] || event.headers['authorization'];
        const token = await verifyToken(authBearer);
        const decodedToken = decodeToken(token);
        const serviceObject = JSON.parse(event.body);

        //check if point exists
        const point = await findOnePoint({id: serviceObject['pointId'] });

        if(!point){
            const error = new Error('Point not found');
            error.statusCode = 404;
            throw error;
        }
        const pointServices = point['services'] || [];
        const newService = await addService({...serviceObject, pointId: point.id, authorId: decodedToken['id']});
        const pointNewServices = Array.from(new Set([...pointServices, newService['id']]));
        
        
        editPoint({...point, services: pointNewServices});

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({"data": newService, "message": " service added"})
        });
    } catch (err) {
        
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err)
        })
    }

};

module.exports.rateService = async(event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        if (!event.body)
            throw ("No data submitted");
        
        // TODO:
        
    } catch (error) {
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err)
        })
    }
}

module.exports.editService = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!event.body)
            throw ("No data submitted");

        const authBearer = event.headers['Authorization'] || event.headers['authorization'];
        const token = await verifyToken(authBearer);
        const decodedToken = decodeToken(token)
        const serviceObject = JSON.parse(event.body);

        const service = await findOneService({id: serviceObject['id']});

        if(!service){
            const error = new Error('Service not found');
            error.statusCode = 404;
            throw error;
        }

        verifyServicePermission({userRole: decodedToken['role'],userId:decodedToken['id'], serviceId: service['authorId']});

        const result = await editService({...serviceObject, authorId: decodedToken['id']});

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({"data": result, "message": " service updated"})
        });
    } catch (err) {
        // console.log(err)
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err)
        })
    }

};

module.exports.getServicesByPointId = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const { id } = event.pathParameters;

        const result = await findServiceByPointId({id});
        let message = "";
        let statusCode = 200;
        if(result.length < 1){
            message = "No  service added";
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
}
module.exports.getServices = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        
        const data = event.queryStringParameters;
        data['skip'] = parseInt(data['skip']);
        data['limit'] = parseInt(data['limit']);

        const token = await verifyToken(event.headers['Authorization']);
        
        const dataCount = await countServices();
        data['deletedAt'] = null;
        const result = await listServices(( data ? data: {} ));
        let message = "";
        let statusCode = 200;
        if(result.length < 1){
            message = "No  service added";
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
}

module.exports.searchServices = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        
        const query = event.queryStringParameters;
        const token = await verifyToken(event.headers['Authorization']);
        const result = await listServices(({ $text:{$search: query['keyword']}}));

        let message = "";
        let statusCode = 200;
        if(result.length < 1){
            message = "No  service found";
            statusCode = 404;
        }
        const filteredResult = result.filter((service) => !service.deletedAt)
    
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

module.exports.removeService = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        
        const {id} = event.pathParameters;
        const authBearer = event.headers['Authorization'] || event.headers['authorization'];
        const token = await verifyToken(authBearer);
        const decodedToken = decodeToken(token);
        
        const service = findOneService({id});

        verifyServicePermission({ userRole: decodedToken['role'], userId: decodedToken['id'], serviceId: service['authorId'] });

        const result = await removeService({id});

        let message = " service removed";
        let statusCode = 200;
        if(result.length < 1){
            message = "No service found";
            statusCode = 404;
        }
    
        callback(null, {
            statusCode,
            body: JSON.stringify({ data: result, message })
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