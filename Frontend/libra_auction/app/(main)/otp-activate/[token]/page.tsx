'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BannerImage from '@/public/background_login.jpg';
import { activateOtpAction } from '@/lib/auth_actions';

export default function OtpActivatePage() {
    const params = useParams();
    const router = useRouter();
    const token = params.token as string;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await activateOtpAction(token, otp);
            if (result.success) {
                router.push(`/password-reset/${token}`);
            } else {
                setError(result.message);
            }
        } catch {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 grid grid-cols-2 gap-6">
            <div className="bg-(--background-color)/60 h-(40hv) rounded-3xl px-24 py-12">
                <div className="flex flex-col gap-5">
                    <p className="text-lg">LibraAuction</p>
                    <p className="text-3xl font-bold">Verify OTP</p>
                    <p>
                        Enter the OTP sent to your email to continue resetting your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-4">
                    <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        className="bg-white border rounded-sm px-4 py-4 text-center text-2xl tracking-widest focus:outline-(--primary-color)"
                        required
                    />

                    {error && (
                        <div className="text-red-700 text-sm">{error}</div>
                    )}

                    <input
                        type="submit"
                        value={loading ? 'Verifying...' : 'Verify OTP'}
                        disabled={loading || otp.length !== 6}
                        className="bg-(--primary-color) text-white font-bold text-lg rounded-full p-3 cursor-pointer hover:bg-(--primary-color)/90 active:bg-(--primary-color)/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </form>

                <div className="mt-4">
                    <Link
                        href="/forgot-password"
                        className="hover:text-(--primary-color) active:text-(--secondary-color)"
                    >
                        Resend OTP
                    </Link>
                </div>
            </div>

            <div className="relative">
                <div className="absolute size-full overflow-hidden rounded-(--box-radius) [--box-radius:1.5rem]">
                    <Image src={BannerImage} alt="" className="object-cover h-full" />
                </div>
                <div className="absolute size-full">
                    <div className="flex flex-col size-full bg-(--accent-color)/20 rounded-(--box-radius) p-(--box-padding) [--box-radius:1.5rem] [--box-padding:0.5rem]">
                        <div className="flex-1">
                            <div className="p-8">
                                <p className="font-extrabold text-5xl text-white/80">
                                    Every bid tells a story of value and competition.
                                </p>
                            </div>
                        </div>
                        <div className="h-40 bg-gray-600/90 rounded-[calc(var(--box-radius)-var(--box-padding))] p-8">
                            <Link
                                href="/sign-in"
                                className="px-6 py-2 border border-white text-white rounded-full cursor-pointer hover:bg-white/8 active:bg-white/16"
                            >
                                Remember your password? Sign in
                            </Link>
                            <p className="text-white mt-3">
                                Sign in to access live auctions, bid in real time, and manage your auction experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
