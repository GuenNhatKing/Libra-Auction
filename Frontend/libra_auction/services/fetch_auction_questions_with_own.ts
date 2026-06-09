'use server';
import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";
import { AuctionQuestion } from "@/types/auction/auction_question";

export async function fetchAuctionQuestionsWithOwn(auctionId: string): Promise<AuctionQuestion[]> {
    const request: RequestInit = {
        method: "GET",
        headers: {},
    };
    const res = await ServerAPIAuthedCall<AuctionQuestion[]>(`/api/auctions/${auctionId}/questions/public`, request);
    if (res.isSuccess && res.data) {
        return res.data;
    }
    throw createAppErrorFromResponse(res, "Failed to fetch auction questions");
}
