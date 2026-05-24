'use server';
import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";
import { ServerAPICall } from "@/lib/server_API_call";
import { Product } from "@/types/product/product";

export async function fetchProduct(product_id: string): Promise<Product> {
    const jwtTokenInfo = await getJWTTokenInfo();
    if (!jwtTokenInfo.token) {
        throw new Error("User's credentials not found");
    }
    const request: RequestInit = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + jwtTokenInfo.token
        }
    }
    const res = await ServerAPICall<Product>("/api/products/" + product_id, request);
    if (res.isSuccess && res.data) {
        console.log(res.data);
        return res.data;
    }
    throw new Error(res.errorMessage || "Failed to fetch product");
}