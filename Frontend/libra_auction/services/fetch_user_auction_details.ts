'use server';
import { ServerAPICall } from "@/lib/server_API_call";
import { Auction } from "@/types/auction/auction";

export async function fetchAuctionDetails(auctionId: string): Promise<Auction> {
  const request: RequestInit = {
    method: "GET",
    headers: {},
  };

  const res = await ServerAPICall<Auction>(
    "/api/public/auctions/" + auctionId,
    request
  );

  if (res.isSuccess && res.data) return res.data;
  throw new Error(res.errorMessage || "Failed to fetch auction details");
}
