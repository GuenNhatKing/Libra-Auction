'use server';
import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";
import { ServerAPICall } from "@/lib/server_API_call";
import { UserInfo } from "@/types/user_info";

export interface UpdateProfileRequest {
  fullName?: string;
  phoneNumber?: string;
  identityNumber?: string;
  avatarUrl?: string;
}

export async function updateUserProfile(
  userId: string,
  data: UpdateProfileRequest
): Promise<UserInfo> {
  const jwtTokenInfo = await getJWTTokenInfo();
  if (!jwtTokenInfo.token) {
    throw new Error("User's credentials not found");
  }

  const request: RequestInit = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + jwtTokenInfo.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await ServerAPICall<UserInfo>("/api/users/" + userId, request);
  if (res.isSuccess && res.data) return res.data;
  throw new Error(res.errorMessage || "Failed to update user profile");
}
