'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { forgotPasswordAction } from '@/lib/auth_actions';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await forgotPasswordAction(email);
            if (result.success && result.token) {
                setToken(result.token);
                setSuccess(true);
            } else {
                setError(result.message);
            }
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
                    <div className="text-5xl mb-4">&#9993;</div>
                    <h1 className="text-2xl font-bold text-blue-600 mb-2">Kiểm tra email của bạn</h1>
                    <p className="text-gray-600 mb-4">
                        Mã OTP đặt lại mật khẩu đã được gửi đến <strong>{email}</strong>.
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                        Vui lòng kiểm tra hộp thư và nhập mã OTP để đặt lại mật khẩu.
                    </p>
                    <button
                        onClick={() => router.push(`/password-reset/${token}`)}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Tiếp tục đặt lại mật khẩu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-2">Quên mật khẩu</h1>
                <p className="text-gray-600 text-center mb-6">
                    Nhập email của bạn để nhận mã OTP đặt lại mật khẩu.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        disabled={loading || !email}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Đang gửi...' : 'Gửi mã OTP'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => router.push('/sign-in')}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Quay lại trang đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
}
