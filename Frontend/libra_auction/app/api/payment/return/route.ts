import { getJWTTokenInfo } from "@/lib/get_jwt_token_info";
import { ServerAPICall } from "@/lib/server_API_call";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const jwtTokenInfo = await getJWTTokenInfo();
    if (!jwtTokenInfo.token) {
        throw new Error("User's credentials not found");
    }

    try {
        // 1. Lấy tất cả params từ URL VNPAY gửi về
        const searchParams = req.nextUrl.searchParams;
        const paramsObj = Object.fromEntries(searchParams.entries());

        // 2. Cấu hình request sử dụng ServerAPICall
        // Giả sử kết quả trả về là một boolean (true/false)
        const requestConfig: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + jwtTokenInfo.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paramsObj),
        };

        // Gọi API sang Backend
        const res = await ServerAPICall<boolean | null>("/api/payments/vnpay/verify", requestConfig);

        // 3. Xử lý kết quả trả về
        if (res.isSuccess) {
            // res.data lúc này sẽ là giá trị boolean từ Backend
            return NextResponse.json({
                success: res.data,
                message: res.data ? "Xác thực giao dịch thành công" : "Giao dịch không hợp lệ"
            }, { status: 200 });
        }

        // Trường hợp Backend trả về lỗi (isSuccess = false)
        throw new Error(res.errorMessage || "Xác thực giao dịch thất bại");

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Lỗi xác thực VNPAY:", errorMessage);

        return NextResponse.json({
            success: false,
            message: errorMessage
        }, { status: 500 });
    }
}