import { mapToLiveAuctionCards } from "@/mappers/live_auctions_mapper";
import { ApiAuctionType } from "@/types/api_types";
import type { LiveAuctionCardType } from "@/types/live_auction_card_type";

export async function FetchLiveAuctions(): Promise<LiveAuctionCardType[]> {
  try {
    const res = await fetch(
      process.env.BACKEND_SERVER_URL! + "/api/auction-sessions/live"
    );

    if (!res.ok) {
      return [];
    }

    const data = (await res.json());
    console.log("Raw FetchLiveAuctions data:", data);
    const mappedData = mapToLiveAuctionCards(data.content as ApiAuctionType[]);

    console.log("FetchLiveAuctions data:", mappedData);

    return mappedData;

  } catch (error) {
    console.log("FetchLiveAuctions error:", error);
    return [];
  }
}