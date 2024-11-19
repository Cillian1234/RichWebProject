import {MongoClient} from "mongodb";

export async function POST(req, res) {
    const { MongoClient } = require('mongodb');
    const url = process.env.MONGODB_URL;
    const client = new MongoClient(url);
    const dbName = 'RichWebApp'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    const body = await req.json()
    const {username, password} = body;

    const collection = db.collection('Users'); // collection name
    let findResult = "";

    try {
        if (!username || !password) {
            console.log("Username and password required")
        } else {
            findResult = await collection.findOne(
                {
                    username, password
                }
            )
            console.log('Found documents =>', findResult)
        }
    } catch (error) {
        console.error("Login error:", error)
    }
    return Response.json(findResult)
}