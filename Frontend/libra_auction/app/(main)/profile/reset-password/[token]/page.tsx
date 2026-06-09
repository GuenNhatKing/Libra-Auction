'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { resetPasswordAction } from '@/lib/auth_actions';

export default function ProfileResetPasswordPage() {
    const params = useParams();
    const router = useRouter();
    const token = params.token as string;

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        setLoading(true);

        try {
            const result = await resetPasswordAction(token, newPassword);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => router.push('/profile/change-password'), 2000);
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
            <div className="space-y-4 text-center">
                <div className="text-5xl mb-4">&#10003;</div>
                <h2 className="text-2xl font-bold text-green-600">Đổi mật khẩu thành công!</h2>
                <p className="text-gray-600">Đang chuyển hướng...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-[var(--secondary-color)]">
                    Đặt lại mật khẩu
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Nhập mật khẩu mới cho tài khoản của bạn.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu mới
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                        minLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Xác nhận mật khẩu
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Nhập lại mật khẩu mới"
                        minLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
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
                    disabled={loading}
                    className="w-full py-3 bg-[var(--primary-color)] text-white rounded-lg font-semibold hover:bg-[var(--secondary-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
                </button>
            </form>
        </div>
    );
}
