import { Product } from "@/types/product_type";
import { apiRequest } from "./api_request";
import { ApiProductResponse } from "@/types/api_types";
import { mapProductListItem } from "@/mappers/product_mapper";

export async function fetchProducts(): Promise<Product[]> {
    const response = await apiRequest<ApiProductResponse[]>(
        "/api/products",
        {
            method: "GET",
        }
    );
    return mapProductListItem(response);
}