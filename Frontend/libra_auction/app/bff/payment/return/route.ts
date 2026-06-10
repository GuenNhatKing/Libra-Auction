import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";

import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log(req.url);
    const jwtTokenInfo = await getJWTTokenInfo();
    if (!jwtTokenInfo.token) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    try {
        const searchParams = req.nextUrl.searchParams;
        const paramsObj = Object.fromEntries(searchParams.entries());

        const requestConfig: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paramsObj),
        };

        // Determine endpoint based on order info
        const orderInfo = searchParams.get("vnp_OrderInfo") || "";
        const isWinnerPayment = orderInfo.includes("Auction payment");
        const endpoint = isWinnerPayment
            ? "/api/payments/vnpay/payment/successed"
            : "/api/payments/vnpay/deposit/successed";

        // Extract auction ID from order info for redirect
        let auctionId = "";
        const auctionMatch = orderInfo.match(/auction\s+(?:deposit|payment):\s*(.+)/i);
        if (auctionMatch) {
            auctionId = auctionMatch[1].trim();
        }

        const res = await ServerAPIAuthedCall<boolean | null>(endpoint, requestConfig);

        const status = (res.isSuccess && res.data) ? "success" : "failed";

        if (auctionId) {
            const handlePath = isWinnerPayment
                ? `/bff/payment/handle?auctionId=${auctionId}&status=${status}&type=winner`
                : `/bff/payment/handle?auctionId=${auctionId}&status=${status}`;
            return NextResponse.redirect(
                new URL(handlePath, req.url)
            );
        }

        // Fallback: redirect to home with status
        return NextResponse.redirect(
            new URL(`/?payment=${status}`, req.url)
        );

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("VNPay verification error:", errorMessage);

        return NextResponse.json({
            success: false,
            message: errorMessage
        }, { status: 500 });
    }
}
