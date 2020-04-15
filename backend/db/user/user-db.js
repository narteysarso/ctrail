const { Id, getRoleKey}  = require("../../utils");
const { ObjectId } = require('mongodb');

module.exports = function makeUsersDB({ makeDB }) {
    makeDB().then(db => {
        db.collection('users').createIndex({
            name: 'text',
            email: 'text',
            phone: 'text',
            roleId: 'text'
        }).catch(err => console.log(err));
    });
    
    return Object.freeze({
        findAll,
        findById,
        findAllByIdExcept,
        findByEmailAndPhone,
        findByRoleId,
        countData,
        insert,
        remove,
        update
    });

    async function findByEmailAndPhone(query){
        const db = await makeDB();
        const result = await db.collection('users').find({ ...query, deletedAt: null });
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function findAll({ skip = 0, limit = 100, ...query }) {
        const db = await makeDB();
        const result = await db.collection('users').find({...query, deletedAt:null}).skip(skip).limit(limit);
        return (await result.toArray()).map(({ _id: id, roleId, password, ...found }) => ({
            id,
            role: getRoleKey(roleId),
            ...found
        }));
    }

    
    async function findById({ id: _id }) {
        const db = await makeDB()
        const result = await db.collection('users').find({ _id : ObjectId(_id) });
        const found = await result.toArray();
        if (found.length === 0) return null

        const { _id: id, password, ...info } = found[0];
        return { id, ...info };
    }

    async function countData(query = {}) {
        const db = await makeDB();

        const result = await db.collection('users').countDocuments({ ...query, deletedAt: null });
        return result;
    }
    
    async function findAllByIdExcept({ id: _id, skip = 0, limit = 100, ...query}) {
        const db = await makeDB()
        const result = await db.collection('users').find({ _id :{$ne: ObjectId(_id) },...query, deletedAt: null}).skip(skip).limit(limit);
        return (await result.toArray()).map(({ _id: id, roleId, password, ...found }) => ({
            id,
            role: getRoleKey(roleId),
            ...found
        }));
    }

    async function findByRoleId({ roleId}) {
        const db = await makeDB();
        const query = { roleId};
        const result = await db.collection('users').find(query);
        return (await result.toArray).map(({ _id: id, roleId, password, ...found }) => ({
            id,
            role: getRoleKey(roleId),
            ...found
        }));
    }


    async function insert({ id: _id = Id.makeId(), ...userInfo }) {
        const db = await makeDB();
        const result = await db.collection('users').insertOne({ ...userInfo });
        const { _id: id, ...insertedInfo } = result.ops[0];
        const {password, ...rest} = insertedInfo;
        return { id, ...rest};
    }

    async function update({ id: _id, ...userInfo }) {
        const db = await makeDB();
        const result = await db.collection('users').updateOne({ _id: ObjectId(_id)}, { $set: { ...userInfo } });
        return result.modifiedCount > 0 ? { id: _id, ...userInfo } : null
    }

    async function remove({ id: _id }) {
        const db = await makeDB();
        const result = await db.collection('users').deleteOne({ _id: ObjectId(_id) });
        return result.deletedCount;
    }

}
