'use server';

import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";
import { ServerAPICall } from "@/lib/server_API_call";
import type { ServerAPIResponse } from "@/types/serser_API_response";

export async function ServerAPIAuthedCall<T>(path: string, request: RequestInit): Promise<ServerAPIResponse<T>> {
    const jwtTokenInfo = await getJWTTokenInfo();
    if (!jwtTokenInfo.token) {
        throw new Error("User's credentials not found");
    }

    const headers = new Headers(request.headers);
    headers.set("Authorization", "Bearer " + jwtTokenInfo.token);

    return ServerAPICall<T>(path, {
        ...request,
        headers,
    });
}
