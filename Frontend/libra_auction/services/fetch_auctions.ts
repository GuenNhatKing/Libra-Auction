import { Auction } from "@/types/auction_type";
import { apiRequest } from "./api_request";
import { mapApiAuctionToAuction } from "@/mappers/auction_mapper";
import { ApiAuctionType } from "@/types/api_types";

export async function fetchAuctions(): Promise<Auction[]> {
    const apiAuctions = await apiRequest<ApiAuctionType[]>("/api/auction-sessions");
    console.log("Fetched auctions from API:", apiAuctions);
    return apiAuctions.map(mapApiAuctionToAuction);
}