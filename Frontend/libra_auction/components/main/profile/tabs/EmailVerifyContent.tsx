"use client";

import { useState } from "react";
import { EmailStatus } from "@/types/status";
import {
  sendEmailVerificationAction,
  activateOtpAction,
  verifyEmailAction,
} from "@/lib/auth_actions";

interface EmailVerifyContentProps {
  email: string;
  emailStatus: EmailStatus;
}

export function EmailVerifyContent({
  email,
  emailStatus,
}: EmailVerifyContentProps) {
  const [status, setStatus] = useState<EmailStatus>(emailStatus);
  const [token, setToken] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isVerified = status === "VERIFIED";

  const handleSendVerification = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await sendEmailVerificationAction(email);
      if (result.success && result.token) {
        setToken(result.token);
        setStatus("PENDING_VERIFICATION");
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!token) {
      setError("Không tìm thấy token xác thực. Vui lòng gửi lại OTP.");
      setLoading(false);
      return;
    }

    try {
      const activateResult = await activateOtpAction(token, otp);
      if (!activateResult.success) {
        setError(activateResult.message);
        return;
      }

      const verifyResult = await verifyEmailAction(token);
      if (!verifyResult.success) {
        setError(verifyResult.message);
        return;
      }

      setStatus("VERIFIED");
      setSuccess("Xác thực email thành công!");
      setToken(null);
      setOtp("");
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[var(--secondary-color)]">
          Email Verification
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Verify your email address to secure your account
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Email Info */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <p className="text-sm text-gray-500">Email address</p>
            <p className="text-base font-medium text-gray-900">{email}</p>
          </div>
          <div>
            {isVerified ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Unverified
              </span>
            )}
          </div>
        </div>

        {/* Verified State */}
        {isVerified && (
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg text-green-700">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm">
              Your email has been verified. You can use all features of the
              system.
            </p>
          </div>
        )}

        {/* Unverified State - Send OTP */}
        {!isVerified && !token && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Your email is not verified. Please verify to create auctions and
              use all features.
            </p>
            <button
              type="button"
              onClick={handleSendVerification}
              disabled={loading}
              className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Sending..." : "Send verification OTP"}
            </button>
          </div>
        )}

        {/* OTP Input */}
        {!isVerified && token && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the OTP code sent to <strong>{email}</strong>.
            </p>
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                OTP Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSendVerification}
                disabled={loading}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Resend OTP
              </button>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex-1 py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </form>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
