import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password } = body;
        const res = await fetch(process.env.BACKEND_SERVER_URL! + '/auth/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        });
        const data = await res.json();
        if (!res.ok) {
            return NextResponse.json({ message: data.message || "Sign in failed" }, { status: res.status });
        }
        const jwtToken = data.token;
        const refreshToken = data.refreshToken;
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'jwtToken',
            value: jwtToken,
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 // 1 day
        });
        cookieStore.set({
            name: 'refreshToken',
            value: refreshToken,
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        return NextResponse.json({ message: "Sign in successful" }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: "Intenal server error" }, { status: 500 });
    }
}