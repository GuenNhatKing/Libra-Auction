'use server';
import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";
import { PageResponse } from "@/types/page_response";
import { Product } from "@/types/product/product";

export async function fetchProducts(
    page: number = 0,
    pageSize: number = 20,
): Promise<PageResponse<Product>> {

    const request: RequestInit = {
        method: "GET",
        headers: {}
    }
    const res = await ServerAPIAuthedCall<PageResponse<Product>>(
        `/api/products?page=${page}&pageSize=${pageSize}`,
        request,
    );
    if (res.isSuccess && res.data) {
        return res.data;
    }
    throw createAppErrorFromResponse(res, "Failed to fetch products");
}
