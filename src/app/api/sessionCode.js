import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers'

export async function getCustomSession(){
    console.log("loading session stuff")
    let pw = "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf"
    let email = "test@email.com"
    const session = await getIronSession(await cookies(),
        {
            password: pw,
            role: null,
            email: null,
            cookieName: "app"
        });
    return session
}