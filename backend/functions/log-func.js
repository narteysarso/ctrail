const {addLog, listPoints, phoneNumberAggregate, contactAggregate} = require('../use-cases');
const {verifyToken, decodeToken,verifyPermission} = require("../utils");

/**
 * @async
 * @name createLog
 * @description Create a new log
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.createLog = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        if (!event.body)
            throw ("No data submitted");

        const data = JSON.parse(event.body);

        //checking if provided point is a valid point
        const point = (await listPoints({ code: data.serviceCode }))[0];
       
        if (!point)
            throw ("Code is not registered");

        const result = await addLog({ pointId: point.id, phone: data.phoneNumber });

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result)
        });
    } catch (err) {
        
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err)
        })
    }

};


/**
 * @async
 * @name findContacts
 * @description Finds a log
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.findContactLogs = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        const token = await verifyToken(event.headers['Authorization']);
        const decodedToken = decodeToken(token);
        const userRole = decodedToken['roleId'];

        verifyPermission(userRole);

        const {phone, startDate, endDate} = event.queryStringParameters;

        //checking if provided point is a valid point
        const results = await phoneNumberAggregate({phone, startDate:parseInt(startDate), endDate: parseInt(endDate)});
        
        if(results.length < 1){
            const error = new Error('Contacts has no logs');
            error.statusCode = 404;
            throw error;
        }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({data: results, message:"Contact logs retrieved"})
        });
    } catch (err) {
        
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err)
        })
    }

};


/**
 * @async
 * @name traceContacts
 * @description Finds a log
 * @param event Object
 * @param context object
 * @param callback function
 * @returns null
 */
module.exports.traceContactLogs = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {

        if(!event.body){
            const error = Error("No data submitted");
            error.statusCode = 400;
            throw error;
        }

        const token = await verifyToken(event.headers['Authorization']);
        const decodedToken = decodeToken(token);
        const userRole = decodedToken['roleId'];

        verifyPermission(userRole);


        const {points, times, timeBias} = JSON.parse(event.body);

        //checking if provided point is a valid point
        console.log(points, times, timeBias);
        const results = await contactAggregate({points, times, timeBias});
        console.log(results)
        if(results.length < 1){
            const error = new Error('No traces found');
            error.statusCode = 404;
            throw error;
        }
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({data: results, message:"traces retrieved"})
        });
    } catch (err) {
        
        callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(err)
        })
    }

};
