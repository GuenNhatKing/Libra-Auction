'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { activateOtpAction, verifyEmailAction } from '@/lib/auth_actions';

export default function OtpActivatePage() {
    const params = useParams();
    const router = useRouter();
    const token = params.token as string;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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

            const useResult = await verifyEmailAction(token);
            if (!useResult.success) {
                setError(useResult.message);
                return;
            }

            setSuccess(true);
            setTimeout(() => router.push('/sign-in'), 3000);
        } catch {
            setError('Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="text-5xl mb-4">&#10003;</div>
                    <h1 className="text-2xl font-bold text-green-600 mb-2">Xác thực thành công!</h1>
                    <p className="text-gray-600">Email của bạn đã được xác thực. Đang chuyển hướng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-2">Xác thực Email</h1>
                <p className="text-gray-600 text-center mb-6">
                    Nhập mã OTP đã được gửi đến email của bạn.
                </p>

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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Đang xác thực...' : 'Xác thực'}
                    </button>
                </form>
            </div>
        </div>
    );
}
