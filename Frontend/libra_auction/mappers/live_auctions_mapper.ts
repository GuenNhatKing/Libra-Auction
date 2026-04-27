import { ApiAuctionType } from "@/types/api_types";
import { LiveAuctionCardType } from "@/types/live_auction_card_type";

export function mapToLiveAuctionCards(
    data: ApiAuctionType[]
): LiveAuctionCardType[] {
    return data.map((item) => {
        return {
            id: item.auction_id,
            image_src: item.images?.[0] || "/fallback.jpg",
            title: item.auction_name,
            current_bid: item.current_price || item.starting_price,
            bids: item.total_bids || 0,
            time_left: item.start_time ? new Date(item.start_time).getTime() + (item.duration * 60 * 1000) - Date.now() : 0,
            category_id: item.category_id,
            href: `/auctions/${item.category_id}/${item.auction_id}`,
        };
    });
};