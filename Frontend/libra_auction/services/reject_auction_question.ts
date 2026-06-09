'use server';
import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";
import { AuctionQuestion } from "@/types/auction/auction_question";

export async function rejectAuctionQuestion(questionId: string): Promise<AuctionQuestion> {
    const request: RequestInit = {
        method: "PUT",
        headers: {},
    };
    const res = await ServerAPIAuthedCall<AuctionQuestion>(`/api/questions/${questionId}/reject`, request);
    if (res.isSuccess && res.data) {
        return res.data;
    }
    throw createAppErrorFromResponse(res, "Failed to reject question");
}
