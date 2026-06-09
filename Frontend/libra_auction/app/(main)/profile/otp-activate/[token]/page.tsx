'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { activateOtpAction, verifyEmailAction } from '@/lib/auth_actions';

export default function ProfileOtpActivatePage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = params.token as string;
    const type = searchParams.get('type');

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const isChangePassword = type === 'change-password';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const activateResult = await activateOtpAction(token, otp);
            if (!activateResult.success) {
                setError(activateResult.message);
                return;
            }

            if (isChangePassword) {
                router.push(`/profile/reset-password/${token}`);
            } else {
                const verifyResult = await verifyEmailAction(token);
                if (!verifyResult.success) {
                    setError(verifyResult.message);
                    return;
                }
                setSuccess(true);
                setTimeout(() => router.push('/profile/email-verify'), 2000);
            }
        } catch {
            setError('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="space-y-4 text-center">
                <div className="text-5xl mb-4">&#10003;</div>
                <h2 className="text-2xl font-bold text-green-600">Xác thực thành công!</h2>
                <p className="text-gray-600">Email của bạn đã được xác thực. Đang chuyển hướng...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-[var(--secondary-color)]">
                    {isChangePassword ? 'Xác thực OTP đổi mật khẩu' : 'Xác thực Email'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Nhập mã OTP đã được gửi đến email của bạn.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                        Mã OTP
                    </label>
                    <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Nhập mã OTP 6 số"
                        maxLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Đang xác thực...' : 'Xác thực OTP'}
                </button>
            </form>
        </div>
    );
}
