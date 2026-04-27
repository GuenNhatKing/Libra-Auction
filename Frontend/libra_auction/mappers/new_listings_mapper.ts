import { ApiAuctionType } from "@/types/api_types";
import { NewListingsCardType } from "@/types/new_listings_card_type";

export function mapToNewListingsCards(
    data: ApiAuctionType[]
): NewListingsCardType[] {
    return data.map((item) => {
        return {
            id: item.auction_id,
            image_src: item.images?.[0] || "/fallback.jpg",
            title: item.auction_name,
            starting_bid: item.starting_price,
            bidders: item.total_participants,
            starting_date: new Date(item.start_time),
            category_id: item.category_id,
            href: `/auctions/${item.category_id}/${item.auction_id}`,
        };
    });
};