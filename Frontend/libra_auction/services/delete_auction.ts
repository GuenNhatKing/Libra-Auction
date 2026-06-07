'use server';
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";

export async function deleteAuction(auction_id: string): Promise<void> {

    const request: RequestInit = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const res = await ServerAPIAuthedCall<null>("/api/auctions/" + auction_id, request);
    if (res.isSuccess) {
        return;
    }
    throw new Error(res.errorMessage || "Failed to delete auctions");
}