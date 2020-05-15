module.exports = function makeFindServices({servicesDb}){

    return async function findOneService(query){
        try{
            query = query ? query : {};

            const services = await servicesDb.findById(query);

            return services;
        }catch(error){
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }
    
}
