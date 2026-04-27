export type AuctionCardType = {
    category_id: string,
    category_name: string,
    auction_id: string,
    auction_name: string,
    auction_status: "UPCOMING" | "LIVE" | "ENDED" | "CANCELLED",
    auction_type: string,
    start_time: string,
    duration: number,

    starting_price: number,
    current_price: number,
    min_bid_increment: number,

    thumbnail: string,

    total_bids?: number,
    total_participants?: number,
    href: string
}