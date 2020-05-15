module.exports = function makeListOpenServices({servicesDb}){

    return async function(query){
        try{
            query = query ? query : {};

            const services = await servicesDb.findOpenServices(query);

            return services;
        }catch(error){
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }
    
}
