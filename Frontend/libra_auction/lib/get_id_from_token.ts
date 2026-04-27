import { cookies } from "next/headers";
import { getCert } from "./get_cert";
import * as jose from "jose";
import { JWSSignatureVerificationFailed, JWTExpired } from "jose/errors";
import { refresh } from "next/cache";
import { refreshToken } from "./refresh_token";

export async function getIdFromToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwtToken");
    const alg = 'RS256';
    const spki = await getCert();
    if (spki && jwtToken && jwtToken.value) {
        const publicKey = await jose.importSPKI(spki, alg);
        try {
            const { payload } = await jose.jwtVerify(jwtToken.value, publicKey);
            return payload.sub as string; 
        }
        catch (error) {
            if (error instanceof JWTExpired) {
                console.log("Token hết hạn");
                if(await refreshToken() == false) {
                    return null;
                }
                return await getIdFromToken();
            }

            if (error instanceof JWSSignatureVerificationFailed) {
                console.log("Invaild token");
            }
            return null;
        }
        return null;
    }
    return null;
}