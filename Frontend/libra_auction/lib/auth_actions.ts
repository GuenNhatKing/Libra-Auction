'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ServerAPICall } from "@/lib/server_API_call";
import { JWTResponse } from "@/types/jwt_response";
import { clearAuthCookies } from "@/lib/clear_auth_cookies";

interface ActionResponse {
    success: boolean;
    message: string;
}

interface SignInBody {
    username: string;
    password: string;
}

interface SignUpBody {
    fullName: string;
    username: string;
    email: string;
    password: string;
}

interface SignUpResponse {
    message?: string;
}

export async function signInAction(body: SignInBody): Promise<ActionResponse> {
    try {
        const { username, password } = body;

        const res = await ServerAPICall<JWTResponse>("/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (res.isSuccess && res.data) {
            const cookieStore = await cookies();

            cookieStore.set({
                name: 'jwtToken',
                value: res.data.token,
                httpOnly: true,
                secure: true,
                maxAge: Math.floor(res.data.accessTokenExpiration / 1000)
            });

            cookieStore.set({
                name: 'refreshToken',
                value: res.data.refreshToken,
                httpOnly: true,
                secure: true,
                maxAge: Math.floor(res.data.refreshTokenExpiration / 1000)
            });

            return { success: true, message: "Sign in successful" };
        }

        return { success: false, message: res.errorMessage || "Failed to sign in" };
    } catch (e) {
        console.error("Error in signInAction:", e);
        return { success: false, message: "Internal server error" };
    }
}

export async function signUpAction(body: SignUpBody): Promise<ActionResponse> {
    try {
        const { fullName, username, email, password } = body;

        const res = await fetch(process.env.BACKEND_SERVER_URL + '/auth/signup', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, username, email, password })
        });

        const data = await res.json() as SignUpResponse;

        if (!res.ok) {
            return { success: false, message: data.message || "Sign up failed" };
        }

        return { success: true, message: "Sign up success" };
    } catch (error) {
        console.error("Error in signUpAction:", error);
        return { success: false, message: "Internal server error" };
    }
}

export async function signOutAction(): Promise<void> {
    await clearAuthCookies();
    redirect('/sign-in');
}

// ==================== Email Verification Actions ====================

export async function sendEmailVerificationAction(email: string): Promise<ActionResponse & { token?: string }> {
    try {
        const res = await ServerAPICall<string>("/auth/email/send-verification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (res.isSuccess && res.data) {
            return { success: true, message: "OTP đã được gửi đến email của bạn.", token: res.data };
        }
        return { success: false, message: res.errorMessage || "Không thể gửi OTP." };
    } catch (e) {
        console.error("Error in sendEmailVerificationAction:", e);
        return { success: false, message: "Internal server error" };
    }
}

export async function activateOtpAction(token: string, otp: string): Promise<ActionResponse> {
    try {
        const res = await ServerAPICall<string>(`/auth/otp/activate/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp })
        });

        if (res.isSuccess) {
            return { success: true, message: "OTP đã được kích hoạt." };
        }
        return { success: false, message: res.errorMessage || "OTP không hợp lệ hoặc đã hết hạn." };
    } catch (e) {
        console.error("Error in activateOtpAction:", e);
        return { success: false, message: "Internal server error" };
    }
}

export async function verifyEmailAction(token: string): Promise<ActionResponse> {
    try {
        const res = await ServerAPICall<string>(`/auth/email/verify/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (res.isSuccess) {
            return { success: true, message: "Xác thực email thành công." };
        }
        return { success: false, message: res.errorMessage || "Không thể xác thực email." };
    } catch (e) {
        console.error("Error in verifyEmailAction:", e);
        return { success: false, message: "Internal server error" };
    }
}

// ==================== Password Reset Actions ====================

export async function forgotPasswordAction(email: string): Promise<ActionResponse & { token?: string }> {
    try {
        const res = await ServerAPICall<string>("/auth/password/forgot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (res.isSuccess && res.data) {
            return { success: true, message: "OTP đặt lại mật khẩu đã được gửi đến email của bạn.", token: res.data };
        }
        return { success: false, message: res.errorMessage || "Không thể gửi OTP." };
    } catch (e) {
        console.error("Error in forgotPasswordAction:", e);
        return { success: false, message: "Internal server error" };
    }
}

export async function resetPasswordAction(token: string, newPassword: string): Promise<ActionResponse> {
    try {
        const res = await ServerAPICall<string>(`/auth/password/reset/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword })
        });

        if (res.isSuccess) {
            return { success: true, message: "Đặt lại mật khẩu thành công." };
        }
        return { success: false, message: res.errorMessage || "Không thể đặt lại mật khẩu." };
    } catch (e) {
        console.error("Error in resetPasswordAction:", e);
        return { success: false, message: "Internal server error" };
    }
}
