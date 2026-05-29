import { Attribute } from "./attribute";

export interface NewProduct {
  name: string;
  quantity: number;
  description: string;
  categoryId: string;
  imageUrls: string[];
  attributes: Attribute[];
}
