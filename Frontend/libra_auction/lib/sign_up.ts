'use client';

import { signUpAction, sendEmailVerificationAction } from "@/lib/auth_actions";

export async function signUp(
    fullName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    onSuccess: (token: string) => void,
    onFailed: (message: string) => void
) {
    try {
        if (password !== confirmPassword) {
            onFailed("Password and Confirm password do not match.");
            return;
        }

        const res = await signUpAction({
            fullName,
            username,
            email,
            password
        });

        if (!res.success) {
            onFailed(res.message);
        } else {
            // Send email verification OTP after successful signup
            const verificationResult = await sendEmailVerificationAction(email);
            if (verificationResult.success && verificationResult.token) {
                onSuccess(verificationResult.token);
            } else {
                onSuccess(''); // Still succeed signup but without token
            }
        }
    }
    catch (error) {
        console.error("Client signup error:", error);
        onFailed("Internal server error");
    }
}
