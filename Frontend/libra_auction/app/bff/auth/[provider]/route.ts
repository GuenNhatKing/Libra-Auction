import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: {
    params: Promise<{ provider: string }>
}) {
    const { provider } = await params;
    if (provider === 'google') {
        const clientId = process.env.GOOGLE_CLIENT_ID;
        const redirectURI = process.env.GOOGLE_REDIRECT_URI;
        const scope = process.env.GOOGLE_OAUTH_SCOPE;

        if (!clientId || !redirectURI || !scope) {
            console.error('Missing Google OAuth environment variables:', {
                GOOGLE_CLIENT_ID: !!clientId,
                GOOGLE_REDIRECT_URI: !!redirectURI,
                GOOGLE_OAUTH_SCOPE: !!scope,
            });
            const failedUrl = new URL('/auth-failed', process.env.NEXT_PUBLIC_FRONTEND_URL);
            failedUrl.searchParams.set('error', 'OAuth configuration error');
            return NextResponse.redirect(failedUrl);
        }

        const options = {
            client_id: clientId,
            redirect_uri: redirectURI,
            response_type: 'code',
            scope: scope,
            prompt: 'select_account',
        }
        const searchParams = new URLSearchParams(options).toString();
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + searchParams;
        return NextResponse.redirect(googleAuthUrl);
    }

    const failedUrl = new URL('/auth-failed', process.env.NEXT_PUBLIC_FRONTEND_URL);
    failedUrl.searchParams.set('error', `Unsupported provider: ${provider}`);
    return NextResponse.redirect(failedUrl);
}