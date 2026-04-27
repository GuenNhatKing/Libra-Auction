import { AuctionTypeEnum } from "./aution_type_enum";

export type AuctionSessionRequestType = {
  productId: string;
  thoiGianBatDau: string;
  thoiLuong: number; // in minutes
  giaKhoiDiem: number;
  buocGiaNhoNhat: number;
  loaiDauGia: AuctionTypeEnum;
}