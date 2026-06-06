'use server';
import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";
import { ServerAPICall } from "@/lib/server_API_call";

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
  const jwtTokenInfo = await getJWTTokenInfo();
  if (!jwtTokenInfo.token) {
    throw new Error("User's credentials not found");
  }

  const request: RequestInit = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwtTokenInfo.token,
    },
    cache: "no-store",
  };

  const res = await ServerAPICall<UserTransactionResponse[]>(
    "/api/payments/vnpay/user/" + userId + "/transactions",
    request
  );

  if (res.isSuccess && res.data) return res.data;
  throw new Error(res.errorMessage || "Failed to fetch transaction history");
}

export async function fetchWalletBalance(userId: string): Promise<number> {
  const jwtTokenInfo = await getJWTTokenInfo();
  if (!jwtTokenInfo.token) {
    throw new Error("User's credentials not found");
  }

  const request: RequestInit = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + jwtTokenInfo.token,
    },
    cache: "no-store",
  };

  const res = await ServerAPICall<{ balance: number }>(
    "/api/payments/vnpay/user/" + userId + "/balance",
    request
  );

  if (res.isSuccess && res.data) return res.data.balance;
  throw new Error(res.errorMessage || "Failed to fetch wallet balance");
}
