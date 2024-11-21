import {MongoClient} from "mongodb";
import connectDB from "@/app/api/connectDB";

export async function POST(req, res) {
    const db= await connectDB();

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