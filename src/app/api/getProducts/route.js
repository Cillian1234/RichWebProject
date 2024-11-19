export async function GET(req, res) {

    // =================================================
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_URL;
    const client = new MongoClient(url);
    const dbName = 'RichWebApp'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('products'); // collection name
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    //==========================================================

    // at the end of the process we need to send something back.
    return Response.json(findResult)
}