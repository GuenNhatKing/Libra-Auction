import { cookies } from "next/headers";
import * as jose from "jose";
import { JWSSignatureVerificationFailed, JWTExpired } from "jose/errors";
import { getCert } from "./get_cert";
import { refreshToken } from "./refresh_token";

export async function isAuthenticated() {
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwtToken");
    const alg = 'RS256';
    const spki = await getCert();
    if (spki && jwtToken && jwtToken.value) {
        const publicKey = await jose.importSPKI(spki, alg);
        try {
            await jose.jwtVerify(jwtToken.value, publicKey);
        }
        catch (error) {
            if (error instanceof JWTExpired) {
                console.log("Token hết hạn");
                return await refreshToken();
            }


            if (error instanceof JWSSignatureVerificationFailed) {
                console.log("Invaild token");
            }
            return false;
        }
        return true;
    }
    return false;
}