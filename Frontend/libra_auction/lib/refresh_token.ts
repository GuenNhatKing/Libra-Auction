import { cookies } from "next/headers";
import { getCert } from "./get_cert";
import * as jose from "jose";

export async function refreshToken() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");
    const jwtToken = cookieStore.get("jwtToken");
    const alg = 'RS256';
    const spki = await getCert();
    if (spki && jwtToken && jwtToken.value) {
        const publicKey = await jose.importSPKI(spki, alg);
        if (refreshToken && refreshToken.value) {
            try {
                await jose.jwtVerify(refreshToken.value, publicKey);
                const res = await fetch('api/refresh', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'refreshToken': refreshToken.value
                    })
                });
                return true;
            } catch (insideError) {
                console.log("Can't refresh token")
                return false;
            }
        }
    }
    return false;
}