'use server';

import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";
import { ServerAPICall } from "@/lib/server_API_call";
import { PageResponse } from "@/types/page_response";
import { PendingUser } from "@/types/admin/pending_user";

export async function fetchPendingUsers(page: number = 0, pageSize: number = 20): Promise<PageResponse<PendingUser>> {
    const jwtTokenInfo = await getJWTTokenInfo();
    if (!jwtTokenInfo.token) {
        throw new Error("User's credentials not found");
    }

    const request: RequestInit = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + jwtTokenInfo.token
        }
    };

    const res = await ServerAPICall<PageResponse<PendingUser>>(
        `/api/admin/users/pending?page=${page}&pageSize=${pageSize}`,
        request,
    );

    if (res.isSuccess && res.data) {
        return res.data;
    }

    if (res.isSuccess) {
        return {
            content: [],
            totalPages: 0,
            totalElements: 0,
            currentPage: page,
            pageSize,
            isFirst: true,
            isLast: true,
        };
    }

    throw new Error(res.errorMessage || "Failed to fetch pending users");
}