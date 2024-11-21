import connectDB from "@/app/api/connectDB";

export async function GET(req, res) {

    // =================================================
    const db = await connectDB();
    const collection = db.collection('products'); // collection name
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    //==========================================================

    // at the end of the process we need to send something back.
    return Response.json(findResult)
}