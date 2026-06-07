'use server';
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";

export async function deleteProduct(product_id: string): Promise<void> {

    const request: RequestInit = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const res = await ServerAPIAuthedCall<null>("/api/products/" + product_id, request);
    if (res.isSuccess) {
        return;
    }
    throw new Error(res.errorMessage || "Failed to delete products");
}