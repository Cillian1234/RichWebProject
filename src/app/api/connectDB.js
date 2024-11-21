export default async function connectDB() {
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_URL;
    const client = new MongoClient(url);
    const dbName = 'RichWebApp'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    return db;
}

