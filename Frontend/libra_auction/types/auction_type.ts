export type AuctionStatus = 'UPCOMING' | 'LIVE' | 'ENDED' | 'CANCELLED';

export type Auction = {
    id: string;
    auction_name: string;
    auction_status: AuctionStatus;
    start_time: string;
    starting_price: number;
}

export interface Question {
    id: string;
    user_name: string;
    content: string;
    created_at: string;
    answer?: {
        content: string;
        replied_at: string;
    };
}

export interface AuctionDetailData {
    id: string;
    auction_name: string;
    starting_price: number;
    description: string;
    questions: Question[];
}

export interface AuctionFormData {
    thoiGianBatDau: string;
    thoiLuong: number; // phút
    giaKhoiDiem: number;
    buocGiaNhoNhat: number;
    loaiDauGia: 'DAU_GIA_LEN' | 'DAU_GIA_XUONG' | 'DAU_GIA_KIN' | 'DAU_GIA_NGUOC';
}