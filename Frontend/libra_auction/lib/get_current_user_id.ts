'use server';
import * as jose from "jose";
import { getJWTTokenInfo } from "./get_jwt_token_info";
import { getJWTPublicKey } from "./get_cert";
import { refreshToken } from "./refresh_token";

export async function getCurrentUserId(): Promise<string | null> {
    const jwtTokenInfo = await getJWTTokenInfo();
    const alg = 'RS256';
    const spki = await getJWTPublicKey();
    if (spki && jwtTokenInfo.token) {
        const publicKey = await jose.importSPKI(spki, alg);
        try {
            const { payload } = await jose.jwtVerify(jwtTokenInfo.token, publicKey);
            return (payload.sub as string) || null;
        } catch (error) {
            if (error instanceof jose.errors.JWTExpired) {
                const refreshed = await refreshToken();
                if (refreshed) {
                    const newTokenInfo = await getJWTTokenInfo();
                    if (newTokenInfo.token) {
                        const { payload } = await jose.jwtVerify(newTokenInfo.token, publicKey);
                        return (payload.sub as string) || null;
                    }
                }
            }
            return null;
        }
    }
    return null;
}
