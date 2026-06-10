import { NextRequest, NextResponse } from "next/server";
import { fetchPublicAuction } from "@/services/fetch_public_auction";

export async function GET(req: NextRequest) {
    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL!;
    const searchParams = req.nextUrl.searchParams;
    const auctionId = searchParams.get("auctionId");
    const status = searchParams.get("status") || "failed";
    const type = searchParams.get("type");

    if (!auctionId) {
        return NextResponse.redirect(new URL("/", frontendUrl));
    }

    try {
        const auction = await fetchPublicAuction(auctionId);
        const redirectPath = type === "winner"
            ? `/profile/wallet?payment=${status}`
            : `/auctions/${auction.category_id}/${auctionId}/registration?status=${status}`;
        return NextResponse.redirect(new URL(redirectPath, frontendUrl));
    } catch {
        // Fallback: redirect to home if auction fetch fails
        return NextResponse.redirect(
            new URL(`/?payment=${status}`, frontendUrl)
        );
    }
}
