"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailStatus } from "@/types/status";
import { forgotPasswordAction } from "@/lib/auth_actions";

interface ChangePasswordContentProps {
  email: string;
  emailStatus: EmailStatus;
  hasPasswordAccount: boolean;
}

export function ChangePasswordContent({
  email,
  emailStatus,
  hasPasswordAccount,
}: ChangePasswordContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isVerified = emailStatus === "VERIFIED";

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await forgotPasswordAction(email);
      if (result.success && result.token) {
        router.push(`/profile/otp-activate/${result.token}?type=change-password`);
      } else {
        setError(result.message);
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[var(--secondary-color)]">
          Change Password
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Reset your password via OTP verification
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* OAuth account gate */}
        {!hasPasswordAccount && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg text-gray-600">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">
              Your account was created with a social login and does not have a password. Password change is not available.
            </p>
          </div>
        )}

        {/* Email not verified gate */}
        {!isVerified && hasPasswordAccount && (
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg text-amber-700">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">
              You need to verify your email before changing your password.{" "}
              <a
                href="/profile/email-verify"
                className="font-semibold underline hover:text-amber-900"
              >
                Verify email now
              </a>
            </p>
          </div>
        )}

        {/* Send OTP */}
        {isVerified && hasPasswordAccount && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg text-blue-700">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">
                An OTP code will be sent to <strong>{email}</strong> to verify
                your identity before changing the password.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
