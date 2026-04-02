import { cookies } from "next/headers";
import * as jose from "jose";

export async function isAuthenticated() {
    const cookieStore = await cookies();
    const jwtToken = cookieStore.get("jwtToken");
    if (jwtToken && jwtToken.value) {
        // TODO: using jose to authenticate jwt token
        return true;
    }
    return false;
}