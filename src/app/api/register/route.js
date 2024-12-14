import connectDB from "@/app/api/connectDB";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";
import jsesc from "jsesc";

export async function POST(req, res) {
    const db= await connectDB();
    const collection = db.collection('Users'); // collection name

    const body = await req.json()
    const {username, password} = body;

    const saltRounds = 10;
    const hash = await bcrypt.hash(escaping(password), saltRounds); // Escape password

    let findResult;

    function escaping(input) {
        return jsesc(input);
    }

    try {
        if (!username || !password) { // If username or password are null
            console.log("Username and password required")
            return Response.json(null)
        } else {
            findResult = await collection.findOne({username})
            if (findResult) { // If username exists
                console.log("Username already in use")
            } else {
                findResult = await collection.insertOne(
                    {
                        username: escaping(username), // Escape username
                        password: hash,
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