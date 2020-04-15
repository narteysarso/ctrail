const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = process.env;
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const dbName = MONGO_DB;
const client = new MongoClient(url, { useNewUrlParser: true });

module.exports = async function makeDB() {
    if (!client.isConnected())
        await client.connect();

    return client.db(dbName);
}