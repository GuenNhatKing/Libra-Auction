import { ServerAPICall } from "@/lib/server_API_call";
import { JWTResponse } from "@/types/jwt_response";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {
    params: Promise<{ provider: string }>
}) {
    const { provider } = await params;
    const searchParams = request.nextUrl.searchParams;
    const successUrl = new URL('/auth-success', process.env.NEXT_PUBLIC_FRONTEND_URL);
    const failedUrl = new URL('/auth-failed', process.env.NEXT_PUBLIC_FRONTEND_URL);

    if (provider !== 'google') {
        failedUrl.searchParams.set('error', `Unsupported provider: ${provider}`);
        return NextResponse.redirect(failedUrl);
    }

    const code = searchParams.get('code');
    if (!code) {
        failedUrl.searchParams.set('error', 'Missing authorization code');
        return NextResponse.redirect(failedUrl);
    }

    try {
        const req: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        }
        const res = await ServerAPICall<JWTResponse>("/auth/google", req);
        if (res.isSuccess && res.data) {
            const cookieStore = await cookies();
            cookieStore.set({
                name: 'jwtToken',
                value: res.data.token,
                httpOnly: true,
                secure: true,
                maxAge: res.data.accessTokenExpiration
            });
            cookieStore.set({
                name: 'refreshToken',
                value: res.data.refreshToken,
                httpOnly: true,
                secure: true,
                maxAge: res.data.refreshTokenExpiration
            });
            return NextResponse.redirect(successUrl);
        }
        failedUrl.searchParams.set('error', res.errorMessage || 'Failed to sign in with Google');
        return NextResponse.redirect(failedUrl);
    } catch (e) {
        console.error('Google OAuth callback error:', e);
        failedUrl.searchParams.set('error', 'Unable to connect to server. Please try again later.');
        return NextResponse.redirect(failedUrl);
    }
}