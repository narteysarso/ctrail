const { Id }  = require("../../utils");
const {ObjectId} = require("mongodb");

module.exports = function makeServiceDB({ makeDB }) {
    makeDB().then( db => {
        db.collection('services').createIndex({
            name: 'text',
            descripton: 'text',
            tags: 'text',
            ghghs: 'text',
            overseer: 'text',
            overseerPhone: 'text'
        }).catch(err => console.log(err))
    });
    return Object.freeze({
        findAll,
        findById,
        findByServiceId,
        countData,
        insert,
        remove,
        update
    });

    async function findAll({ skip = 0, limit = 100, ...query }) {
        const db = await makeDB();
        const result = await db.collection('services').find(query).skip(skip).limit(limit);
        
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function findById({ id: _id }) {
        const db = await makeDB()
        const result = await db.collection('services').find({ _id: ObjectId(_id) });
        const found = await result.toArray();
        if (found.length === 0) return null

        const { _id: id, ...info } = found[0];
        return { id, ...info };
    }

    async function findByServiceId({ code}) {
        const db = await makeDB();
        const query = { code };
        const result = await db.collection('services').find({ services : ObjectId(_id) });
        return (await result.toArray).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function countData (query = {}){
        const db = await makeDB();
        
        const result = await db.collection('services').countDocuments({...query, deletedAt: null});
        return result;
    }

    async function insert({ id: _id = Id.makeId(), ...serviceInfo }) {
        const db = await makeDB();
        const authorId = ObjectId(serviceInfo['authorId']);
        const result = await db.collection('services').insertOne({ ...serviceInfo, authorId });
        const { _id: id, ...insertedInfo } = result.ops[0];
        return { id, ...insertedInfo };
    }

    async function update({ id: _id, ...serviceInfo }) {
        const db = await makeDB();
        const result = await db.collection('services').updateOne({ _id: ObjectId(_id) }, { $set: { ...serviceInfo } });
        return result.modifiedCount > 0 ? { id: _id, ...serviceInfo } : null
    }

    async function remove({ id: _id }) {
        const db = await makeDB();
        const result = await db.collection('services').deleteOne({ _id: ObjectId(_id) });
        return result.deletedCount;
    }

}
