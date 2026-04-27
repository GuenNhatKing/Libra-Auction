type JSONValue = string | number | boolean | JSONValue[] | {
    [k: string]: JSONValue;
}
type RequestBody = BodyInit | Record<string, JSONValue>;

interface ApiOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: RequestBody;
    headers?: HeadersInit;
    credentials?: RequestCredentials;
}

export async function apiRequest<T>(
    url: string,
    options: ApiOptions = {}
): Promise<T> {
    url = "http://localhost:8080" + url;
    const { method = "GET", body, headers, credentials = "include" } = options;

    let finalBody: BodyInit | undefined = undefined;
    const finalHeaders = new Headers(headers);

    // xử lý body
    if (body instanceof FormData) {
        finalBody = body;
    } else if (body && typeof body === "object") {
        finalBody = JSON.stringify(body);
        finalHeaders.set("Content-Type", "application/json");
    }
    console.log("Making API request to:", url);
    console.log("Request options:", { method, body: finalBody, headers: finalHeaders, credentials });

    const res = await fetch(url, {
        method,
        body: finalBody,
        headers: finalHeaders,
        credentials,
    });

    const contentType = res.headers.get("content-type");

    const raw = await res.text();

    if (!res.ok) {
        console.error("Error response:", raw);
        throw new Error(raw || "Request failed");
    }

    if (contentType?.includes("application/json")) {
        return JSON.parse(raw) as T;
    }

    return raw as T;
}