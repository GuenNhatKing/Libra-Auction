import { mapApiAuctionToAuctionCardType } from "@/mappers/auction_mapper";
import { ApiAuctionType } from "@/types/api_types";
import { AuctionCardType } from "@/types/auction_card_type";
import { apiRequest } from "./api_request";
export async function FetchAuctionCards(): Promise<AuctionCardType[]> {
    const apiAuctions = await apiRequest<ApiAuctionType[]>("/api/auction-sessions");
    return apiAuctions.map(mapApiAuctionToAuctionCardType);
}