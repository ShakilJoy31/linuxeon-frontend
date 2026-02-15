'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function PaymentFailPage() {
    const [pageReady, setPageReady] = useState(false);

    // First useEffect - reload the page once when it first loads
    useEffect(() => {
        const hasReloaded = sessionStorage.getItem('paymentFailReloaded');
        
        if (!hasReloaded) {
            sessionStorage.setItem('paymentFailReloaded', 'true');
            window.location.reload();
        } else {
            setPageReady(true);
        }
    }, []);

    // Show loading state while page is not ready
    if (!pageReady) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
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
                        className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                    </motion.div>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Payment Failed
                    </h1>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        We couldn&apos;t process your payment. Please try again.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href="/register"
                            className="block w-full px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-medium hover:from-red-700 hover:to-orange-700 transition-all duration-200 text-center"
                        >
                            <RefreshCw className="inline mr-2 w-4 h-4" />
                            Try Again
                        </Link>
                        
                        <Link
                            href="/"
                            className="block w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 text-center"
                        >
                            <Home className="inline mr-2 w-4 h-4" />
                            Return to Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}