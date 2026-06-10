import { Attribute } from "./attribute";
import { ProductStatus } from "../status";

export interface Product {
  product_id: string;
  product_name: string;
  category_id: string;
  category_name: string;
  quantity: number;
  description: string;
  status?: ProductStatus;
  images: string[];
  attributes: Attribute[];
}