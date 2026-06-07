'use server';
import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";

export interface UserTransactionResponse {
  transactionId: string;
  vnpayTxnRef: string;
  amount: number;
  description: string;
  detailInfo: string;
  status: "SUCCESS" | "FAILED" | "PROCESSING" | "REFUNDED" | "CANCELLED";
  createdAt: string;
  transactionType: "DEPOSIT" | "PAYMENT";
  incoming: boolean;
}

export async function fetchTransactionHistory(
  userId: string
): Promise<UserTransactionResponse[]> {

  const request: RequestInit = {
    method: "GET",
    headers: {},
    cache: "no-store",
  };

  const res = await ServerAPIAuthedCall<UserTransactionResponse[]>(
    "/api/payments/vnpay/user/" + userId + "/transactions",
    request
  );

  if (res.isSuccess && res.data) return res.data;
  throw createAppErrorFromResponse(res, "Failed to fetch transaction history");
}
