'use server';
import { createAppErrorFromResponse } from "@/lib/app_error";
import { ServerAPIAuthedCall } from "@/lib/server_API_authed_call";

export interface PendingWinnerPaymentResponse {
  auctionId: string;
  auctionResultId: string;
  auctionName: string;
  productName: string;
  amount: number;
  status: string;
  endedAt: string;
}

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

export async function fetchPendingWinnerPayments(userId: string): Promise<PendingWinnerPaymentResponse[]> {
  const request: RequestInit = {
    method: "GET",
    headers: {},
    cache: "no-store",
  };

  const res = await ServerAPIAuthedCall<PendingWinnerPaymentResponse[]>(
    "/api/payments/vnpay/user/" + userId + "/pending-payments",
    request
  );

  if (res.isSuccess && res.data) return res.data;
  throw createAppErrorFromResponse(res, "Failed to fetch pending payments");
}

export async function fetchAdminTransactionHistory(): Promise<UserTransactionResponse[]> {
  const request: RequestInit = {
    method: "GET",
    headers: {},
    cache: "no-store",
  };

  const res = await ServerAPIAuthedCall<UserTransactionResponse[]>(
    "/api/payments/vnpay/admin/transactions",
    request
  );

  if (res.isSuccess && res.data) return res.data;
  throw createAppErrorFromResponse(res, "Failed to fetch admin transaction history");
}
