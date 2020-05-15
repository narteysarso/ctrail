module.exports = function makeFindServiceByPointId({servicesDb}){

    return async function findServiceByPointId({id}){
        try{

            const services = await servicesDb.findByPointId({id});

            return services;
        }catch(error){
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }
    
}
