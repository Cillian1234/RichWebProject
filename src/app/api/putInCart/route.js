import connectDB from "@/app/api/connectDB";

export async function GET(req, res) {

    const { searchParams } = new URL(req.url)
    const item = searchParams.get('item')
    console.log(item);

    // =================================================
    const db= await connectDB();
    const collection = db.collection('shopping-cart'); // collection name

    let myobj = { pName: item, username: "sample@test.com"};
    const insertResult = await collection.insertOne(myobj);

    console.log('Inserted document =>', insertResult);
    //==========================================================


    // at the end of the process we need to send something back.
    return Response.json(insertResult)
}