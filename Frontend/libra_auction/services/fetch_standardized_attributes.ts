'use server';
import { ServerAPICall } from "@/lib/server_API_call";

interface StandardizedAttribute {
    id: string;
    attributeName: string;
    attributeValue: string;
}

export async function fetchAttributeNames(): Promise<string[]> {
    const res = await ServerAPICall<string[]>(
        "/api/public/standardized-attributes",
        { method: "GET" }
    );
    if (!res.isSuccess) return [];
    return res.data ?? [];
}

export async function fetchAttributeValues(name: string): Promise<StandardizedAttribute[]> {
    const res = await ServerAPICall<StandardizedAttribute[]>(
        `/api/public/standardized-attributes/${encodeURIComponent(name)}/values`,
        { method: "GET" }
    );
    if (!res.isSuccess) return [];
    return res.data ?? [];
}

export async function searchAttributes(keyword: string): Promise<StandardizedAttribute[]> {
    const res = await ServerAPICall<StandardizedAttribute[]>(
        `/api/public/standardized-attributes/search?keyword=${encodeURIComponent(keyword)}`,
        { method: "GET" }
    );
    if (!res.isSuccess) return [];
    return res.data ?? [];
}
