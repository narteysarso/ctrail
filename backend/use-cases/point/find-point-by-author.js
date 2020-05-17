module.exports = function makeFindPointsByAuthorId({pointsDb}){

    return async function (query){
        try{

            const points = await pointsDb.findByAuthorId(query);

            return points;
        }catch(error){
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }
    
}
