module.exports = function makeListPoints({pointsDb}){

    return async function(query){
        try{
            query = query ? query : {};

            const points = await pointsDb.findAll(query);

            return points;
        }catch(error){
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }
    
}
