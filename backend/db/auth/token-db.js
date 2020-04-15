const { Id } = require("../../utils");

module.exports = function makeTokensDB({ makeDB }) {
    return Object.freeze({
        findAll,
        findById,
        findByToken,
        insert,
        remove
    });

    async function findAll(query = {}) {
        const db = await makeDB();
        const result = await db.collection('tokens').find(query);
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }

    async function findById({ id: _id }) {
        const db = await makeDB()
        const result = await db.collection('tokens').find({ _id });
        const found = await result.toArray();
        if (found.length === 0) return null

        const { _id: id, ...info } = found[0];
        return { id, ...info };
    }

    async function findByToken({ token }) {
        const db = await makeDB();
        const query = { token };
        const result = await db.collection('tokens').find(query);
        return (await result.toArray).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }));
    }


    async function insert({ id: _id = Id.makeId(), ...tokenInfo }) {
        const db = await makeDB();
        const result = await db.collection('tokens').insertOne({ ...tokenInfo });
        const { _id: id, ...insertedInfo } = result.ops[0];
        return {id,...insertedInfo };
    }

    async function remove({ id: _id }) {
        const db = await makeDB();
        const result = await db.collection('tokens').deleteOne({ _id });
        return result.deletedCount;
    }

}
