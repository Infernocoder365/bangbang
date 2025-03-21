'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (!email) {
            router.push('/auth/signin');
        }
    }, [email, router]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0 && !canResend) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0 && !canResend) {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [countdown, canResend]);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            setSuccessMessage('Email verified successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/auth/signin');
            }, 2000);
        } catch (error: any) {
            setErrorMessage(error.message || 'An error occurred during verification');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await fetch('/api/auth/resend-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to resend OTP');
            }

            setSuccessMessage('A new verification code has been sent to your email');
            setCountdown(60);
            setCanResend(false);
        } catch (error: any) {
            setErrorMessage(error.message || 'An error occurred while resending OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h1>

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}

            <p className="text-center mb-6">
                We've sent a verification code to <strong>{email}</strong>. Please enter the code below to verify your email address.
            </p>

            <form onSubmit={handleVerify} className="space-y-4">
                <div>
                    <label htmlFor="otp" className="block text-sm font-medium mb-1">Verification Code</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        className="w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                        placeholder="Enter 6-digit code"
                        required
                        maxLength={6}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <p>
                    Didn't receive a code?{' '}
                    {canResend ? (
                        <button
                            onClick={handleResendOtp}
                            className="text-blue-600 hover:underline font-medium"
                            disabled={loading}
                        >
                            Resend Code
                        </button>
                    ) : (
                        <span className="text-gray-500">
                            Resend code in {countdown} seconds
                        </span>
                    )}
                </p>
            </div>

            <div className="mt-6 text-center text-sm">
                <p>
                    <Link href="/auth/signin" className="text-blue-600 hover:underline font-medium">
                        Back to Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}