'use server';
import type { ServerAPIResponse } from "@/types/serser_API_response";

export async function ServerAPICall<T>(path: string, request: RequestInit): Promise<ServerAPIResponse<T>> {
    let res: Response;
    try {
        res = await fetch(process.env.BACKEND_SERVER_URL + path, request);
    } catch {
        return {
            status: 503,
            isSuccess: false,
            errorMessage: "Cannot connect to server",
        } as ServerAPIResponse<T>;
    }
    try {
        if(res.status == 204) {
            return {
                status: res.status,
                isSuccess: true,
                errorMessage: undefined,
                data: undefined
            }
        }
        const data = await res.json();
        // Backend returns "message" in error responses, but frontend expects "errorMessage"
        const errorMessage = data.errorMessage || data.message || undefined;
        return {
            ...data,
            status: res.status,
            errorMessage,
        } as ServerAPIResponse<T>;
    }
    catch {
        return {
            status: res.status,
            isSuccess: false,
            errorMessage: "Invalid response format from server",
            data: undefined
        } as ServerAPIResponse<T>;
    }
}