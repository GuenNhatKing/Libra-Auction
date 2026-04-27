import { ApiProductResponse } from "@/types/api_types";
import { Product, ProductDetailData } from "@/types/product_type";
import { AttributeType } from "@/types/attribute_type";

export function mapProductListItem(
    item: ApiProductResponse[]
): Product[] {
    return item.map((item) => ({
        id: item.product_id,
        product_name: item.product_name,
        category_id: item.category_id,
        category_name: item.category_name,
        quantity: item.quantity,
        description: item.description,
        images: item.images ?? [],
        attributes: (item.attributes ?? []).map((attr): AttributeType => ({
            key: attr.name,
            value: attr.value,
            isSystem: false,
        })),
    }));
}

export function mapProductDetail(
    data: ApiProductResponse
): ProductDetailData {
    console.log("Mapping product detail from API response:", data); 
    return {
        id: data.product_id,
        product_name: data.product_name,
        category_id: data.category_id,
        category_name: data.category_name,
        quantity: data.quantity,
        description: data.description,
        images: data.images ?? [],

        attributes: (data.attributes ?? []).map((attr): AttributeType => ({
            key: attr.name,
            value: attr.value,
            isSystem: false,
        })),
    };
}