'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { verifyEmailAction } from '@/lib/auth_actions';

export default function EmailVerifyPage() {
    const params = useParams();
    const router = useRouter();
    const token = params.token as string;

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verify = async () => {
            try {
                const result = await verifyEmailAction(token);
                if (result.success) {
                    setStatus('success');
                    setMessage(result.message);
                    setTimeout(() => router.push('/sign-in'), 3000);
                } else {
                    setStatus('error');
                    setMessage(result.message);
                }
            } catch {
                setStatus('error');
                setMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
            }
        };

        verify();
    }, [token, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                {status === 'loading' && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h1 className="text-xl font-bold">Đang xác thực email...</h1>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="text-5xl mb-4">&#10003;</div>
                        <h1 className="text-2xl font-bold text-green-600 mb-2">Thành công!</h1>
                        <p className="text-gray-600">{message}</p>
                        <p className="text-gray-500 text-sm mt-2">Đang chuyển hướng...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="text-5xl mb-4">&#10007;</div>
                        <h1 className="text-2xl font-bold text-red-600 mb-2">Thất bại</h1>
                        <p className="text-gray-600">{message}</p>
                        <button
                            onClick={() => router.push('/sign-in')}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Về trang đăng nhập
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
