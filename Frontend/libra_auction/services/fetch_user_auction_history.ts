'use server';
import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";

export interface AuctionRegistrationResponse {
  id: string;
  userId: string;
  email: string;
  auctionId: string;
  registrationTime: string;
}

export async function fetchUserAuctionHistory(userId: string): Promise<AuctionRegistrationResponse[]> {
  const jwtTokenInfo = await getJWTTokenInfo();
  if (!jwtTokenInfo.token) {
    throw new Error("User's credentials not found");
  }

  const res = await fetch(
    process.env.BACKEND_SERVER_URL + "/api/auction-registrations/user/" + userId,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwtTokenInfo.token,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch auction history");
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return data as AuctionRegistrationResponse[];
  }

  if (data?.isSuccess && Array.isArray(data.data)) {
    return data.data as AuctionRegistrationResponse[];
  }

  throw new Error(data?.errorMessage || "Failed to fetch auction history");
}
