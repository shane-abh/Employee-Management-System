require('dotenv').config();
const {
    MongoClient
} = require('mongodb');

let db;

// function for connecting to database
async function connectToDb() {
    const url = process.env.DB_URL || 'mongodb://localhost/employee_ms1';

    const client = new MongoClient(url, {
        useNewUrlParser: true
    });
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
}

function getDb() {
    return db;
}

module.exports = {
    connectToDb,
    getDb
};