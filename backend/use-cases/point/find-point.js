module.exports = function makeFindPointById({pointsDb}){

    return async function({id}){
        try{

            const point = await pointsDb.findById({id});

            return point;
        }catch(error){
            error.statusCode = error.statusCode || 500;
            throw error;
        }
    }
    
}
