import connectDB from "@/app/api/connectDB";
import {redirect} from "next/navigation";

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
                    username
                }
            )
            console.log(findResult)
            if (findResult) {
                console.log("Username already in use")

            } else {
                findResult = await collection.insertOne(
                    {
                        username: username,
                        password: password,
                        acc_type: "Customer"
                    })
                redirect('/')
                return Response.json(findResult)
            }
        }
    } catch (error) {
        console.error("Login error:", error)

    }
    return Response.json("findResult")
}