import { ProductDetailData } from "@/types/product_type";
import { apiRequest } from "./api_request";
import { mapProductDetail } from "@/mappers/product_mapper";
import { ApiProductResponse } from "@/types/api_types";

export async function fetchProductDetail(
    id: string
): Promise<ProductDetailData> {
    const response = await apiRequest<ApiProductResponse>(
        `/api/products/${id}`,
        {
            method: "GET",
        }
    );
    console.log("Fetched product detail:", response);
    return mapProductDetail(response);
}