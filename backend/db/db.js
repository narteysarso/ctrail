const {
    AWS_MONGO_DB:MONGO_DB,
    AWS_MONGO_USERNAME:MONGO_USERNAME,
    AWS_MONGO_HOSTNAME:MONGO_HOSTNAME,
    AWS_MONGO_PASSWORD:MONGO_PASSWORD
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