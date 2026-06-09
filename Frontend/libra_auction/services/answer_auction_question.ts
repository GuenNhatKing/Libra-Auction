'use server';
import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";
import { AuctionQuestion } from "@/types/auction/auction_question";

export async function answerAuctionQuestion(questionId: string, content: string): Promise<AuctionQuestion> {
    const request: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
    };
    const res = await ServerAPIAuthedCall<AuctionQuestion>(`/api/questions/${questionId}/answer`, request);
    if (res.isSuccess && res.data) {
        return res.data;
    }
    throw createAppErrorFromResponse(res, "Failed to answer question");
}
