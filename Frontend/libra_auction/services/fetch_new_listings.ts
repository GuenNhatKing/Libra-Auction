import { mapToNewListingsCards } from "@/mappers/new_listings_mapper";
import { ApiAuctionType } from "@/types/api_types";
import type { NewListingsCardType } from "@/types/new_listings_card_type";

export async function FetchNewListings(): Promise<NewListingsCardType[]> {
  try {
    const res = await fetch(
      process.env.BACKEND_SERVER_URL! + "/api/auction-sessions/upcoming"
    );

    if (!res.ok) {
      return [];
    }

    const data = (await res.json());
    console.log("Raw FetchNewListings data:", data);
    const mappedData = mapToNewListingsCards(data.content as ApiAuctionType[]);

    for (const item of mappedData) {
      item.starting_date = new Date(item.starting_date);
      item.href = "/auctions/" + item.category_id + "/" + item.id;
    }
    console.log("FetchNewListings data:", mappedData);

    return mappedData;

  } catch (error) {
    console.log("FetchNewListings error:", error);
    return [];
  }
}