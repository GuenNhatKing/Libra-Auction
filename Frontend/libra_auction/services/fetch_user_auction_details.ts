'use server';
import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";
import { ServerAPICall } from "@/lib/server_API_call";
import { Auction } from "@/types/auction/auction";

export async function fetchAuctionDetails(auctionId: string): Promise<Auction> {
  const jwtTokenInfo = await getJWTTokenInfo();
  
  const request: RequestInit = {
    method: "GET",
    headers: jwtTokenInfo.token ? {
      "Authorization": "Bearer " + jwtTokenInfo.token,
    } : {},
  };

  const res = await ServerAPICall<Auction>(
    "/api/public/auctions/" + auctionId,
    request
  );

  if (res.isSuccess && res.data) return res.data;
  throw new Error(res.errorMessage || "Failed to fetch auction details");
}
