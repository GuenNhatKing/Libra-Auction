'use server';

import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";
import { ServerAPICall } from "@/lib/server_API_call";
import { AdminAuction } from "@/types/admin/admin_auction";

export async function approveAuction(auctionId: string): Promise<AdminAuction> {
    const jwtTokenInfo = await getJWTTokenInfo();
    if (!jwtTokenInfo.token) {
        throw new Error("User's credentials not found");
    }

    const request: RequestInit = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + jwtTokenInfo.token
        }
    };

    const res = await ServerAPICall<AdminAuction>(`/api/admin/auctions/${auctionId}/approve`, request);
    if (res.isSuccess && res.data) {
        return res.data;
    }

    throw new Error(res.errorMessage || "Failed to approve auction");
}