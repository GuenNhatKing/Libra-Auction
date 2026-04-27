import { AttributeType } from "./attribute_type";

export type ProductCreateRequestType = {
  tenTaiSan: string;
  soLuong: number;
  moTa: string;
  danhMucId: string;
  imageUrl: string;
  attributes: AttributeType[];
};