const { Id }  = require("../../utils");
const {ObjectId} = require("mongodb");

module.exports = function makePointsDB({ makeDB }) {
    makeDB().then( db => {
        db.collection('points').createIndex({
            name: 'text',
            descripton: 'text',
            tags: 'text',
            ghghs: 'text',
            overseer: 'text',
            overseerPhone: 'text'
        }).catch(err => console.log(err))

        db.collection('points').createIndex({"loc": "2dsphere"}).catch(err => console.log(err));
    });
    return Object.freeze({
        findAll,
        findById,
        findByServiceCode,
        countData,
        insert,
        remove,
        update,
        closestLocation
    });

    async function findAll({ skip = 0, limit = 100, ...query }) {
        const db = await makeDB();
        const result = await db.collection('points').find(query).skip(skip).limit(limit);
        
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function closestLocation ({latitude, longitude, searchtext, limit = 100, maxDistance = 1000}){
        const db = await makeDB();
        
        const pattern = new RegExp(`^.*${(searchtext.split(' ')).join('|')}.*$`,'i');
        
        const pipeline = [
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
                    distanceField: "dist.calculated",
                    maxDistance,
                    query: { deletedAt: null, $or:[{name: pattern}, {category: pattern}, {description: pattern}, {tags: pattern}] }, 
                    includeLocs: "dist.location",
                    spherical: true
                }
            },
            
        ];

        pipeline.push({ $limit: limit })

        const result = await db.collection('points').aggregate([...pipeline])

        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function findById({ id: _id }) {
        const db = await makeDB()
        const result = await db.collection('points').find({ _id: ObjectId(_id) });
        const found = await result.toArray();
        if (found.length === 0) return null

        const { _id: id, ...info } = found[0];
        return { id, ...info };
    }

    async function findByServiceCode({ code}) {
        const db = await makeDB();
        const query = { code };
        const result = await db.collection('points').find(query);
        return (await result.toArray).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function countData (query = {}){
        const db = await makeDB();
        
        const result = await db.collection('points').countDocuments({...query, deletedAt: null});
        return result;
    }

    async function insert({ id: _id = Id.makeId(), ...pointInfo }) {
        const db = await makeDB();
        const authorId = ObjectId(pointInfo['authorId']);
        const result = await db.collection('points').insertOne({ ...pointInfo, authorId });
        const { _id: id, ...insertedInfo } = result.ops[0];
        return { id, ...insertedInfo };
    }

    async function update({ id: _id, ...pointInfo }) {
        const db = await makeDB();
        const result = await db.collection('points').updateOne({ _id: ObjectId(_id) }, { $set: { ...pointInfo } });
        return result.modifiedCount > 0 ? { id: _id, ...pointInfo } : null
    }

    async function remove({ id: _id }) {
        const db = await makeDB();
        const result = await db.collection('points').deleteOne({ _id: ObjectId(_id) });
        return result.deletedCount;
    }

}
