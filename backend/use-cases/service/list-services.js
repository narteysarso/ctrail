module.exports = function makeListServices({servicesDb}){

    return async function(query){
        try{
            query = query ? query : {};

            const services = await servicesDb.findAll(query);

            return services;
        }catch(error){
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }
    
}
