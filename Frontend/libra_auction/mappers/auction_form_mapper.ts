import { ApiAuctionType } from "@/types/api_types";
import { AuctionFormData } from "@/types/auction_type";

export function mapApiAuctionToForm(api: ApiAuctionType): AuctionFormData {
    return {
        thoiGianBatDau: api.start_time ? api.start_time.slice(0, 16) : "",
        thoiLuong: api.duration ?? 0,
        giaKhoiDiem: api.starting_price,
        buocGiaNhoNhat: api.min_bid_increment ?? 0,
        loaiDauGia: (api.auction_type as AuctionFormData["loaiDauGia"]) ?? "DAU_GIA_LEN"
    };
}