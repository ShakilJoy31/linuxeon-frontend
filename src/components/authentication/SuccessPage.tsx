'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(7);
    const [pageReady, setPageReady] = useState(false);

    useEffect(() => {
        // Check if we've already reloaded using sessionStorage
        const hasReloaded = sessionStorage.getItem('paymentSuccessReloaded');
        
        if (!hasReloaded) {
            // Set flag and reload after delay
            sessionStorage.setItem('paymentSuccessReloaded', 'true');
            const timer = setTimeout(() => {
                window.location.reload();
            }, 500);
            return () => clearTimeout(timer);
        } else {
            // Already reloaded, show content
            setPageReady(true);
        }
    }, []);

    useEffect(() => {
        if (!pageReady) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Clear sessionStorage when leaving
                    sessionStorage.removeItem('paymentSuccessReloaded');
                    router.push('/login');
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router, pageReady]);

    if (!pageReady) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Preparing your payment confirmation...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </motion.div>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Payment Successful!
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Your account has been activated successfully.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href="/login"
                            className="block w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 text-center"
                        >
                            Go to Login
                            <ArrowRight className="inline ml-2 w-4 h-4" />
                        </Link>

                        <Link
                            href="/"
                            className="block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 text-center"
                        >
                            <Home className="inline mr-2 w-4 h-4" />
                            Return to Home
                        </Link>
                    </div>

                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Redirecting to login in {countdown} seconds...
                    </p>
                </div>
            </motion.div>
        </div>
    );
}