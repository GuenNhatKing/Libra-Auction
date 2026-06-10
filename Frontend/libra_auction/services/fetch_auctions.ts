'use server';
import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";
import { Auction } from "@/types/auction/auction";
import { PageResponse } from "@/types/page_response";

export async function fetchAuctions(
    page: number = 0,
    pageSize: number = 20,
): Promise<PageResponse<Auction>> {

    const request: RequestInit = {
        method: "GET",
        headers: {}
    }
    const res = await ServerAPIAuthedCall<PageResponse<Auction>>(
        `/api/auctions?page=${page}&pageSize=${pageSize}`,
        request,
    );
    if (res.isSuccess && res.data) {
        return res.data;
    }
    throw createAppErrorFromResponse(res, "Failed to fetch auctions");
}
