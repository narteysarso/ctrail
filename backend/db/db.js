const {
    MONGO_DB,
    MONGO_USERNAME,
    MONGO_HOSTNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
} = process.env;
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/test?retryWrites=true&w=majority`;
const dbName = MONGO_DB;
const client = new MongoClient(url, { useNewUrlParser: true });
console.log(url);
module.exports = async function makeDB() {
     if (!client.isConnected())
        await client.connect();

    return client.db(dbName);
}