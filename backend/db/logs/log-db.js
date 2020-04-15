const { Id }  = require("../../utils");
const {ObjectId} = require("mongodb");

module.exports = function makeLogsDB({ makeDB }) {
    return Object.freeze({
        findAll,
        findById,
        findByPoint,
        phoneNumberAggregate,
        insert,
        remove,
        update,
        contactAggregate
    });

    async function contactAggregate({points, times, timebais}) {
        const db = await makeDB();
        points = points.map(point => ObjectId(point));
        
        const pipeline = [
            {
                $match: {
                    pointId: {$in : points},
                }
            },
            {
                $sort:{
                    createdAt: 1
                }
            }
        ];
        const result = await db.collection('logs').aggregate([...pipeline]);
        return (await result.toArray()).map(({ _id:id , ...found }) => ({
            id,
            ...found
        }));
    }
    async function phoneNumberAggregate({phone, startDate, endDate}){
        const db = await makeDB();
        const pipeline = [
            {
                $match: {
                    phone: phone,
                    createdAt: {$lte: endDate, $gte: startDate}
                }
            },
            {
                $sort: {
                    createdAt: 1,
                }
            }
        ];
        const result = await db.collection('logs').aggregate([...pipeline]);
        return (await result.toArray()).map(({pointId, createdAt, ...found}) => ({
            pointId,
            createdAt
        }));

    }

    async function findAll(query = { }) {
        const db = await makeDB();
        const result = await db.collection('logs').find({query});
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function findById({ id: _id }) {
        const db = await makeDB()
        const result = await db.collection('logs').find({ _id });
        const found = await result.toArray();
        if (found.length === 0) return null

        const { _id: id, ...info } = found[0];
        return { id, ...info };
    }

    async function findByPoint({ pointId}) {
        const db = await makeDB();
        const query =  { pointId : pointId}
        const result = await db.collection('logs').find(query);
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function insert({ id: _id = Id.makeId(), ...logInfo }) {
        const db = await makeDB();
        const result = await db.collection('logs').insertOne({ ...logInfo });
        const { _id: id, ...insertedInfo } = result.ops[0];
        return { id, ...insertedInfo };
    }

    async function update({ id: _id, ...logInfo }) {
        const db = await makeDB();
        const result = await db.collection('logs').updateOne({ _id }, { $set: { ...logInfo } });
        return result.modifiedCount > 0 ? { id: _id, ...logInfo } : null
    }

    async function remove({ id: _id }) {
        const db = await makeDB();
        const result = await db.collection('logs').deleteOne({ _id });
        return result.deletedCount;
    }

}
