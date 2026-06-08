'use server';

import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";

export async function deleteAdminAuction(auctionId: string): Promise<void> {
  const request: RequestInit = {
    method: "DELETE",
    headers: {},
  };

  const res = await ServerAPIAuthedCall<null>(`/api/admin/auctions/${auctionId}`, request);
  if (res.isSuccess) {
    return;
  }

  throw createAppErrorFromResponse(res, "Failed to delete auction");
}
