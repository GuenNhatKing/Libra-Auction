import { AttributeType } from "./attribute_type";
export type Product = {
    id: string;
    product_name: string;
    quantity: number;
    category_id: string;
    category_name: string;
    images: string[];
    description?: string;
    image_url?: string;
}

export type ProductDetailData = {
    id: string;
    product_name: string;
    quantity: number;
    category_id: string;
    category_name: string;
    description: string;
    images: string[];
    attributes: AttributeType[];
}