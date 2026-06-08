'use server';
import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";

interface VNPayPaymentResponse {
    paymentUrl: string;
}

export async function createWinnerPayment(auctionId: string, auctionResultId: string): Promise<string> {
    const request: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ auctionId, auctionResultId }),
    };

    const res = await ServerAPIAuthedCall<VNPayPaymentResponse>("/api/payments/vnpay/create-payment", request);
    if (res.isSuccess && res.data) {
        return res.data.paymentUrl;
    }
    throw createAppErrorFromResponse(res, "Failed to create winner payment");
}
