'use server';

import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";
import { AdminAuction } from "@/types/admin/admin_auction";

export async function approveAuction(auctionId: string): Promise<AdminAuction> {

    const request: RequestInit = {
        method: "POST",
        headers: {}
    };

    const res = await ServerAPIAuthedCall<AdminAuction>(`/api/admin/auctions/${auctionId}/approve`, request);
    if (res.isSuccess && res.data) {
        return res.data;
    }

    throw new Error(res.errorMessage || "Failed to approve auction");
}