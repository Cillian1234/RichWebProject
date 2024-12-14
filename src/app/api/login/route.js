import connectDB from "@/app/api/connectDB";
import bcrypt from "bcrypt";
import jsesc from "jsesc";

export async function POST(req, res) {
    const db= await connectDB();
    const collection = db.collection('Users'); // collection name

    const body = await req.json()
    const {username, password} = body;

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
            if (!findResult) {
                console.log("No documents found")
                return Response.json(null)
            } else {
                let escapedPass = escaping(password); // Escape password
                let hashResult = await bcrypt.compare(escapedPass, findResult.password);
                console.log("Valid password: ", hashResult)
                return Response.json(findResult)
            }
        }
    } catch (error) {
        console.error("Login error:", error)
    }
}