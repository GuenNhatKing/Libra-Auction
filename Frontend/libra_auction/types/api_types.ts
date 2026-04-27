import { AttributeType } from "./attribute_type";

export type ApiProductResponse = {
    product_id: string;
    product_name: string;
    category_id: string;
    category_name: string;
    quantity: number;
    description: string;
    images: string[];
    attributes: {
        name: string;
        value: string;
    }[];
};

export type ApiAuctionType = {
    category_id: string;
    category_name: string;

    auction_id: string;
    auction_name: string;
    auction_status: string;
    auction_type: string;

    start_time: string; // LocalDateTime -> ISO string
    duration: number;

    starting_price: number;
    current_price: number;
    min_bid_increment: number;

    product_id: string;
    product_name: string;
    quantity: number;
    description: string;

    images: string[];

    attributes: {
        name: string;
        value: string;
    }[];

    total_bids: number;
    total_participants: number;
};

// export type ApiNewListingsType = {
//     attributes: {
//         name: string;
//         value: string;
//     }[]; auction_id: string;
//     auction_name: string;
//     auction_status: "CHUA_BAT_DAU" | "DANG_DIEN_RA" | "DA_KET_THUC";
//     auction_type: string;
//     category_id: string;
//     category_name: string;
//     current_price: number;
//     description: string;
//     duration: number; // phút
//     images: string[];
//     min_bid_increment: number;
//     product_id: string;
//     product_name: string;
//     quantity: number;
//     start_time: string; // ISO string
//     starting_price: number;
//     total_bids: number;
//     total_participants: number;
// };