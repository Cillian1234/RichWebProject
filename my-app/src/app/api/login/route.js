import {MongoClient} from "mongodb";

export async function POST(req, res) {
    const { MongoClient } = require('mongodb');
    const DBusername = encodeURIComponent("Cillian")
    const DBpassword = encodeURIComponent("KoVU8NVsMkw8yvad")
    const url = `mongodb+srv://${DBusername}:${DBpassword}@cluster0.wlig0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const client = new MongoClient(url);
    const dbName = 'RichWebApp'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);

    const body = await req.json()
    const {username, password} = body;

    const collection = db.collection('Users'); // collection name
    let findResult = "";
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
    return Response.json(findResult)
}