import { MongoClient } from "mongodb";

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

export function connectToMongo(callback) {
    client.connect().then(client => {
        callback();
    }).catch(err => {
        callback(err);
    });
};

export function getDb(dbName = process.env.DB_NAME) {
    return client.db(dbName);
};

// These are just used for closing the connection properly
function signalHandler() {
    console.log("Closing MongoDB connection...");
    process.exit();
    client.close();
}

process.on("SIGINT", signalHandler);
process.on("SIGTERM", signalHandler);
process.on("SIGQUIT", signalHandler);