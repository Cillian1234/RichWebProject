import connectDB from "@/app/api/connectDB";
import bcrypt from "bcrypt";

export async function POST(req, res) {
    const db= await connectDB();
    const collection = db.collection('Users'); // collection name

    const body = await req.json()
    const {username, password} = body;

    let findResult;

    try {
        if (!username || !password) {
            console.log("Username and password required")
            return Response.json(null)
        } else {
            findResult = await collection.findOne({username})
            if (!findResult) {
                console.log("No documents found")
                return Response.json(null)
            } else {
                let hashResult = await bcrypt.compare(password, findResult.password);
                console.log("Valid password: ", hashResult)
                return Response.json(findResult)
            }
        }
    } catch (error) {
        console.error("Login error:", error)
    }
}