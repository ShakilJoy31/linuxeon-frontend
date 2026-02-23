'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Eye, EyeOff, Lock, Mail, X, Loader2, AlertCircle, Shield,
    Smartphone, UserCircle, ArrowRight, CreditCard, DollarSign,
    CheckCircle2, Clock, LogIn
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoginMutation, useProcessPaymentMutation } from '@/redux/api/authentication/authApi';
import { shareWithCookies } from '@/utils/helper/shareWithCookies';
import { appConfiguration } from '@/utils/constant/appConfiguration';

// Login schema validation
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Account info type for pending user
interface PendingAccountInfo {
    id: number;
    fullName: string;
    email: string;
    status: string;
    role: string;
}

export default function LoginForm() {
    const router = useRouter();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    
    // Form state
    const [showPassword, setShowPassword] = useState(false);
    const [animateBg, setAnimateBg] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    // Payment modal state
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [pendingAccountInfo, setPendingAccountInfo] = useState<PendingAccountInfo | null>(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    // API hooks
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [processPayment] = useProcessPaymentMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    // Background animation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimateBg(prev => !prev);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Handle theme mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    const handlePayment = async () => {
        if (!pendingAccountInfo) return;
        
        setIsProcessingPayment(true);
        setPaymentError(null);

        try {
            // Create payment payload with the same structure as register
            const paymentPayload = {
                userId: pendingAccountInfo.id,
                amount: 50,
                paymentMethod: 'sslcommerz',
                payload: {
                    fullName: pendingAccountInfo.fullName,
                    email: pendingAccountInfo.email,
                    role: pendingAccountInfo.role,
                    // Note: We don't have all the registration fields here,
                    // but the payment API should work with just these fields
                    // as it's the same user from the database
                }
            };

            const response = await processPayment(paymentPayload).unwrap();

            if (response.success && response.data?.gatewayUrl) {
                // Redirect to SSLCommerz payment page
                window.location.href = response.data.gatewayUrl;
            } else {
                throw new Error(response.message || 'Payment initiation failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
            const errorMsg = error?.data?.message || error?.message || 'Payment failed. Please try again.';
            setPaymentError(errorMsg);
            toast.error(errorMsg);
            setIsProcessingPayment(false);
        }
    };

    const onSubmit = async (data: LoginFormData) => {
        setErrorMessage(null);
        
        try {
            const response = await login(data).unwrap();
            
            if (response.success) {
                // Normal login flow for active accounts
                if (response.data?.tokens?.accessToken) {
                    const { accessToken, refreshToken } = response.data.tokens;

                    // Set tokens in cookies
                    const tokenName = `${appConfiguration.appCode}token`;
                    const refreshTokenName = `${appConfiguration.appCode}refreshToken`;

                    shareWithCookies("set", tokenName, 1440, accessToken); // 1 day
                    shareWithCookies("set", refreshTokenName, 10080, refreshToken); // 7 days

                    toast.success('Login successful!');

                    // Redirect based on user role
                    const userRole = response.data?.role?.toLowerCase();
                    if (userRole === 'admin' || userRole === 'super_admin') {
                        router.push(`/redirect?to=/admin/dashboard`);
                    } else {
                        router.push(`/redirect?to=/admin/dashboard`);
                    }
                }
            }
        } catch (error: any) {
            console.error('Login error:', error);
            
            // Check if this is a pending account error (403 with accountInfo)
            if (error?.status === 403 && error?.data?.accountInfo) {
                // Store pending account info and show payment modal
                setPendingAccountInfo(error.data.accountInfo);
                setShowPaymentModal(true);
                
                // Show the message from the API
                toast.error(error.data.message || 'Your account is pending approval. Please complete payment to activate.');
            } else {
                // Handle other login errors
                const errorMessage = error?.data?.message || error?.message || 'Invalid email or password';
                setErrorMessage(errorMessage);
                toast.error(errorMessage);
            }
        }
    };

    // Don't render theme-dependent UI until mounted
    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black p-4">
                <div className="animate-pulse">
                    <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                    <div className="h-96 w-96 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={cn(
                "min-h-screen mt-16 flex items-center justify-center p-4 transition-colors duration-300",
                "bg-gradient-to-br from-gray-50 via-white to-blue-50",
                "dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black"
            )}>
                {/* Animated background elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -inset-2.5 opacity-30 dark:opacity-50">
                        <div className={cn(
                            "absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob",
                            "bg-gradient-to-r from-blue-200 to-purple-200",
                            animateBg && "animate-pulse"
                        )} />
                        <div className={cn(
                            "absolute top-1/3 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000",
                            "bg-gradient-to-r from-green-200 to-blue-200",
                            animateBg && "animate-pulse"
                        )} />
                        <div className={cn(
                            "absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000",
                            "bg-gradient-to-r from-pink-200 to-yellow-200",
                            animateBg && "animate-pulse"
                        )} />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className={cn(
                        "rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-300",
                        "bg-white/80 border border-gray-200/50",
                        "dark:bg-gray-900/80 dark:border-gray-800"
                    )}>
                        {/* Header */}
                        <div className="p-8 pb-6">
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col items-center mb-8"
                            >
                                <div className="relative mb-4">
                                    <div className={cn(
                                        "absolute inset-0 rounded-full blur-lg opacity-75",
                                        "bg-gradient-to-r from-blue-400 to-purple-500",
                                        "dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-600"
                                    )} />
                                    <div className={cn(
                                        "relative w-16 h-16 rounded-full flex items-center justify-center border-2",
                                        "bg-white border-gray-200",
                                        "dark:bg-gray-900 dark:border-gray-800"
                                    )}>
                                        <LogIn className={cn(
                                            "w-8 h-8",
                                            "text-blue-500",
                                            "dark:text-blue-400"
                                        )} />
                                    </div>
                                </div>
                                <h1 className={cn(
                                    "text-2xl font-bold mb-2",
                                    "text-gray-900",
                                    "dark:text-white"
                                )}>
                                    Welcome Back
                                </h1>
                                <p className={cn(
                                    "text-sm",
                                    "text-gray-600",
                                    "dark:text-gray-400"
                                )}>
                                    Sign in to your account to continue
                                </p>
                            </motion.div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {errorMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={cn(
                                            "mb-4 p-3 rounded-lg border",
                                            "bg-red-50/50 border-red-200",
                                            "dark:bg-red-500/10 dark:border-red-500/20"
                                        )}
                                    >
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                            <AlertCircle className="w-4 h-4" />
                                            <span className="text-sm">{errorMessage}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label className={cn(
                                        "block text-sm font-medium mb-2",
                                        "text-gray-700",
                                        "dark:text-gray-300"
                                    )}>
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className={cn(
                                                "w-5 transition-colors",
                                                "text-gray-400 group-focus-within:text-blue-500",
                                                "dark:text-gray-500 dark:group-focus-within:text-blue-400"
                                            )} />
                                        </div>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            disabled={loginLoading}
                                            className={cn(
                                                "block w-full pl-10 pr-3 py-3 rounded-lg placeholder-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                                "bg-white/70 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                                "dark:bg-gray-800/70 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500"
                                            )}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className={cn(
                                        "block text-sm font-medium mb-2",
                                        "text-gray-700",
                                        "dark:text-gray-300"
                                    )}>
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className={cn(
                                                "w-5 transition-colors",
                                                "text-gray-400 group-focus-within:text-blue-500",
                                                "dark:text-gray-500 dark:group-focus-within:text-blue-400"
                                            )} />
                                        </div>
                                        <input
                                            {...register('password')}
                                            type={showPassword ? 'text' : 'password'}
                                            disabled={loginLoading}
                                            className={cn(
                                                "block w-full pl-10 pr-10 py-3 rounded-lg placeholder-gray-500 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                                                "bg-white/70 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                                                "dark:bg-gray-800/70 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500"
                                            )}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                                            ) : (
                                                <Eye className="w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Forgot Password Link */}
                                <div className="flex justify-end">
                                    <Link
                                        href="/forgot-password"
                                        className={cn(
                                            "text-sm font-medium transition-colors",
                                            "text-blue-600 hover:text-blue-500",
                                            "dark:text-blue-400 dark:hover:text-blue-300"
                                        )}
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={loginLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                        "w-full px-6 py-3 hover:cursor-pointer text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                        "bg-gradient-to-r from-blue-600 to-purple-600",
                                        "dark:from-blue-700 dark:to-purple-700"
                                    )}
                                >
                                    {loginLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className={cn(
                            "px-8 py-6 border-t",
                            "bg-gradient-to-r from-gray-50/50 to-blue-50/50 border-gray-200",
                            "dark:bg-gradient-to-r dark:from-gray-900/50 dark:to-gray-800/50 dark:border-gray-800"
                        )}>
                            <p className={cn(
                                "text-center",
                                "text-gray-600",
                                "dark:text-gray-400"
                            )}>
                                Don't have an account?{' '}
                                <Link
                                    href="/register"
                                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Mobile App CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={cn(
                            "mt-6 p-4 rounded-xl border backdrop-blur-sm",
                            "bg-gradient-to-r from-white/80 to-blue-50/80 border-gray-200",
                            "dark:bg-gradient-to-r dark:from-gray-900/80 dark:to-gray-800/80 dark:border-gray-800"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-2 rounded-lg",
                                "bg-gradient-to-r from-blue-100 to-purple-100",
                                "dark:bg-gradient-to-r dark:from-blue-500/10 dark:to-purple-500/10"
                            )}>
                                <Smartphone className={cn(
                                    "w-5 h-5",
                                    "text-blue-600",
                                    "dark:text-blue-400"
                                )} />
                            </div>
                            <div className="flex-1">
                                <p className={cn(
                                    "text-sm font-medium",
                                    "text-gray-900",
                                    "dark:text-white"
                                )}>
                                    Get our mobile app
                                </p>
                                <p className={cn(
                                    "text-xs",
                                    "text-gray-600",
                                    "dark:text-gray-400"
                                )}>
                                    Manage your account on the go
                                </p>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                                Download
                            </button>
                        </div>
                    </motion.div>

                    {/* Security Badge */}
                    <div className="mt-4 text-center">
                        <p className={cn(
                            "text-xs flex items-center justify-center gap-1",
                            "text-gray-500",
                            "dark:text-gray-400"
                        )}>
                            <Shield className="w-3 h-3" />
                            Your data is protected with 256-bit SSL encryption
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {showPaymentModal && pendingAccountInfo && (
                    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-lg w-full rounded-2xl shadow-2xl flex flex-col max-h-[80vh] dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:border-gray-700 bg-white border border-gray-200"
                        >
                            {/* Modal Header - Fixed */}
                            <div className="p-6 border-b rounded-t-2xl dark:border-gray-700 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full dark:bg-blue-500/20 dark:ring-2 dark:ring-blue-500/30 bg-blue-100 ring-2 ring-blue-200">
                                        <CreditCard className="w-6 h-6 dark:text-blue-400 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold dark:text-white text-gray-900">
                                            Account Pending Activation
                                        </h3>
                                        <p className="text-sm dark:text-gray-400 text-gray-600">
                                            Complete payment to activate your account
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowPaymentModal(false);
                                            setPendingAccountInfo(null);
                                            setPaymentError(null);
                                        }}
                                        className="p-2 rounded-full transition-colors dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body - Scrollable */}
                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                <div className="space-y-6">
                                    {/* Welcome Message with User Info */}
                                    <div className="p-5 rounded-xl relative overflow-hidden dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-purple-900/30 dark:border dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-10 -mt-10" />
                                        <p className="text-sm relative z-10 dark:text-gray-200 text-gray-700">
                                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                {pendingAccountInfo.fullName}
                                            </span>
                                            , your account is pending activation. Please complete the payment to start using our services.
                                        </p>
                                    </div>

                                    {/* Payment Error Message */}
                                    <AnimatePresence>
                                        {paymentError && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="p-3 rounded-lg border bg-red-50/50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20"
                                            >
                                                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="text-sm">{paymentError}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* SMS Service Card */}
                                    <div className="space-y-3">
                                        <h4 className="text-base font-semibold flex items-center gap-2 dark:text-white text-gray-900">
                                            <span className="w-1 h-5 rounded-full dark:bg-blue-500 bg-blue-600" />
                                            SMS Service Activation
                                        </h4>

                                        <div className="p-5 rounded-xl border dark:bg-gray-800/50 dark:border-gray-700 bg-white border-gray-200 shadow-sm">
                                            {/* Credit Display */}
                                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-dashed dark:border-gray-700 border-gray-200">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg dark:bg-blue-900/30 bg-blue-100">
                                                        <CreditCard className="w-5 h-5 dark:text-blue-400 text-blue-600" />
                                                    </div>
                                                    <span className="text-sm font-medium dark:text-gray-300 text-gray-700">
                                                        Initial SMS Credit
                                                    </span>
                                                </div>
                                                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                                    ৳50
                                                </span>
                                            </div>

                                            {/* Benefits List */}
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
                                                    <div className="mt-0.5">
                                                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                                            <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium dark:text-gray-200 text-gray-700">
                                                            Instant Activation
                                                        </p>
                                                        <p className="text-xs dark:text-gray-400 text-gray-500">
                                                            Your account becomes active immediately after payment
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
                                                    <div className="mt-0.5">
                                                        <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                                            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium dark:text-gray-200 text-gray-700">
                                                            Pay-as-you-go SMS
                                                        </p>
                                                        <p className="text-xs dark:text-gray-400 text-gray-500">
                                                            Credits are deducted per SMS sent
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform">
                                                    <div className="mt-0.5">
                                                        <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                                            <AlertCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium dark:text-gray-200 text-gray-700">
                                                            Easy Recharge
                                                        </p>
                                                        <p className="text-xs dark:text-gray-400 text-gray-500">
                                                            Top up anytime through your dashboard
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing Summary */}
                                    <div className="p-5 rounded-xl text-center relative overflow-hidden dark:bg-gradient-to-br dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 dark:border dark:border-blue-500/30 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border border-blue-200">
                                        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                                        <p className="text-sm mb-2 relative z-10 dark:text-gray-300 text-gray-600">
                                            One-time Activation Fee
                                        </p>
                                        <div className="relative z-10">
                                            <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                                                ৳50
                                            </span>
                                            <span className="text-sm ml-2 dark:text-gray-400 text-gray-500">
                                                BDT
                                            </span>
                                        </div>
                                        <p className="text-xs mt-2 relative z-10 dark:text-gray-400 text-gray-500">
                                            Includes 50 Taka SMS credit • No hidden charges
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer - Fixed */}
                            <div className="p-6 border-t rounded-b-2xl dark:border-gray-700 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setShowPaymentModal(false);
                                            setPendingAccountInfo(null);
                                            setPaymentError(null);
                                        }}
                                        className="flex-1 hover:cursor-pointer px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border dark:border-gray-600 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                                    >
                                        Later
                                    </button>
                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessingPayment}
                                        className="flex-1 hover:cursor-pointer px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isProcessingPayment ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <DollarSign className="w-4 h-4" />
                                                Complete Payment
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Scrollbar styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${theme === 'dark' ? '#4B5563' : '#D1D5DB'};
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${theme === 'dark' ? '#6B7280' : '#9CA3AF'};
                }
            `}</style>

            {/* Animation styles */}
            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    );
}