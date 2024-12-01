import { getCustomSession } from '../sessionCode.js'


export async function GET(req, res) {

    const body = await req.json()
    const {email} = body;

    let session = await getCustomSession()
    session.role = 'customer' // setting the persons role into the session
    session.email = email
    await session.save()
    console.log("data saved")
    return Response.json({})
}