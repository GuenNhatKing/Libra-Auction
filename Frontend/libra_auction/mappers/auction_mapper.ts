import { ApiAuctionType } from "@/types/api_types";
import { AuctionCardType } from "@/types/auction_card_type";
import { Auction, AuctionStatus } from "@/types/auction_type";

export function mapApiAuctionToAuction(api: ApiAuctionType): Auction {
    return {
        id: api.auction_id,
        auction_name: api.auction_name,
        auction_status: mapAuctionStatus(api.auction_status),
        start_time: api.start_time,
        starting_price: api.starting_price,
    };
}

export function mapApiAuctionToAuctionCardType(api: ApiAuctionType): AuctionCardType {
    return {
        category_id: api.category_id,
        category_name: api.category_name,
        auction_id: api.auction_id,
        auction_name: api.auction_name,
        auction_status: mapAuctionStatus(api.auction_status),
        auction_type: api.auction_type,
        start_time: api.start_time,
        duration: api.duration,
        starting_price: api.starting_price,
        current_price: api.current_price,
        min_bid_increment: api.min_bid_increment,
        thumbnail: api.images && api.images.length > 0 ? api.images[0] : "/placeholder.png",
        total_bids: api.total_bids,
        total_participants: api.total_participants,
        href: `/auctions/${api.category_id}/${api.auction_id}`
    };
}

function mapAuctionStatus(status: string): AuctionStatus {
    switch (status) {
        case "CHUA_BAT_DAU":
            return "UPCOMING";
        case "DANG_DIEN_RA":
            return "LIVE";
        case "DA_KET_THUC":
            return "ENDED";
        case "DA_HUY":
            return "CANCELLED";
        default:
            return "UPCOMING";
    }
}