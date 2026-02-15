'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Lock, Mail, LogIn, Loader2, AlertCircle, Shield, Smartphone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { appConfiguration } from '@/utils/constant/appConfiguration'; // Import your configuration
import { shareWithCookies } from '@/utils/helper/shareWithCookies';
import { useLoginMutation } from '@/redux/api/authentication/authApi';

// Schema validation
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
  onForgotPassword?: () => void;
}

export default function LoginForm({
  onForgotPassword
}: LoginFormProps) {
  const router = useRouter();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [animateBg, setAnimateBg] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Background animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateBg(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);


  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    try {

      const response = await login({
        email: data.email,
        password: data.password
      }).unwrap();

      if (response.success && response.data?.tokens?.accessToken) {
        const { accessToken, refreshToken } = response.data.tokens;

        // Set tokens in cookies using shareWithCookies
        const tokenName = `${appConfiguration.appCode}token`;
        const refreshTokenName = `${appConfiguration.appCode}refreshToken`;

        // 7 days = 10080 minutes, 30 days = 43200 minutes
        const accessTokenExpiry = data.rememberMe ? 10080 : 1440; // 7 days or 1 day
        const refreshTokenExpiry = data.rememberMe ? 43200 : 10080; // 30 days or 7 days

        // Set access token cookie
        shareWithCookies("set", tokenName, accessTokenExpiry, accessToken);

        // Set refresh token cookie
        shareWithCookies("set", refreshTokenName, refreshTokenExpiry, refreshToken);

        // Verify cookies were set
        const verifyAccessToken = shareWithCookies("get", tokenName, 0);
        const verifyRefreshToken = shareWithCookies("get", refreshTokenName, 0);

        console.log('Cookies set verification:', {
          accessTokenSet: !!verifyAccessToken,
          refreshTokenSet: !!verifyRefreshToken
        });


        // Redirect based on user role
        const userRole = response.data.role?.toLowerCase();

        console.log(response.data.role)

        if (userRole === 'admin' || userRole === 'super_admin') {
          router.push(`/redirect?to=/admin/dashboard`);
        } else {
          router.push(`/redirect?to=/admin/dashboard`);
        }

        toast.success('Successfully logged in!');

      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);

      // Extract error message from RTK Query error
      const errorMessage = error?.data?.message || error?.message || 'Login failed';
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    }
  };




  const handleSocialLogin = (provider: 'google' | 'github' | 'linkedin') => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1000)),
      {
        loading: `Connecting with ${provider}...`,
        success: `Redirecting to ${provider} authentication`,
        error: `Failed to connect with ${provider}`,
      }
    );
  };

  // Don't render theme-dependent UI until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-blue-50 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black p-4">
        <div className="animate-pulse">
          <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
          <div className="h-96 w-96 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "min-h-screen mt-16 flex items-center justify-center p-4 transition-colors duration-300",
      "bg-linear-to-br from-gray-50 via-white to-blue-50",
      "dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black"
    )}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -inset-2.5 opacity-30 dark:opacity-50">
          {/* Light mode blobs */}
          <div className={cn(
            "absolute top-1/4 left-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob",
            "bg-linear-to-r from-blue-200 to-purple-200",
            "from-purple-500 to-pink-500 opacity-70",
            animateBg && "animate-pulse"
          )} />

          <div className={cn(
            "absolute top-1/3 right-1/4 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000",
            "bg-linear-to-r from-green-200 to-blue-200",
            "from-blue-500 to-cyan-500 opacity-70",
            animateBg && "animate-pulse"
          )} />

          <div className={cn(
            "absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000",
            "bg-linear-to-r from-pink-200 to-yellow-200",
            "from-pink-500 to-rose-500 opacity-70",
            animateBg && "animate-pulse"
          )} />

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg">

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
              className="flex flex-col items-center mb-6"
            >
              <div className="relative mb-4">
                <div className={cn(
                  "absolute inset-0 rounded-full blur-lg opacity-75",
                  "bg-linear-to-r from-blue-400 to-purple-500",
                  "dark:bg-linear-to-r dark:from-blue-500 dark:to-purple-600"
                )} />
                <div className={cn(
                  "relative w-16 h-16 rounded-full flex items-center justify-center border-2",
                  "bg-white border-gray-200",
                  "dark:bg-gray-900 dark:border-gray-800"
                )}>
                  <Shield className={cn(
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

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
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
                      `${errors.email?.message ? 'mb-5' : ''} w-5 transition-colors`,
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
                      "dark:bg-gray-800/70 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-transparent"
                    )}
                    placeholder="you@example.com"
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                          "mt-1 text-sm flex items-center gap-1",
                          "text-red-600",
                          "dark:text-red-400"
                        )}
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={cn(
                    "block text-sm font-medium",
                    "text-gray-700",
                    "dark:text-gray-300"
                  )}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={cn(
                      `${errors.password?.message ? 'mb-5' : ''} w-5 transition-colors`,
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
                      "dark:bg-gray-800/70 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-transparent"
                    )}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className={cn(
                        `${errors.password?.message ? 'mb-5' : ''} w-5 transition-colors`,
                        "text-gray-500 hover:text-gray-700",
                        "dark:text-gray-500 dark:hover:text-gray-700"
                      )} />
                    ) : (
                      <Eye className={cn(
                        `${errors.password?.message ? 'mb-5' : ''} w-5 transition-colors`,
                        "text-gray-500 hover:text-gray-700",
                        "dark:text-gray-500 dark:hover:text-gray-300"
                      )} />
                    )}
                  </button>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={cn(
                          "mt-1 text-sm flex items-center gap-1",
                          "text-red-600",
                          "dark:text-red-400"
                        )}
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Remember Me & Submit */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('rememberMe')}
                    disabled={loginLoading}
                    className={cn(
                      "w-4 h-4 rounded focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer group-hover:border-blue-400",
                      "border-gray-300 bg-white text-blue-500 focus:ring-blue-500 focus:ring-offset-white",
                      "dark:border-gray-700 dark:bg-gray-800 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:ring-offset-gray-900"
                    )}
                  />
                  <span className={cn(
                    "text-sm transition-colors",
                    "text-gray-700 group-hover:text-gray-900",
                    "dark:text-gray-300 dark:group-hover:text-gray-200"
                  )}>
                    Remember me
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={loginLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative px-6 hover:cursor-pointer py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group",
                    "bg-linear-to-r from-blue-600 to-purple-600",
                    "dark:from-blue-700 dark:to-purple-700"
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    "bg-linear-to-r from-blue-500 to-purple-500",
                    "dark:from-blue-600 dark:to-purple-600"
                  )} />
                  <div className="relative flex items-center justify-center gap-2">
                    {loginLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </>
                    )}
                  </div>
                </motion.button>
              </div>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={cn(
                    "w-full border-t",
                    "border-gray-300",
                    "dark:border-gray-800"
                  )} />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={cn(
                    "px-2",
                    "bg-white text-gray-500",
                    "dark:bg-gray-900 dark:text-gray-400"
                  )}>
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  {
                    provider: 'google',
                    lightColor: 'bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600',
                    darkColor: 'bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700',
                    icon: 'G'
                  },
                  {
                    provider: 'github',
                    lightColor: 'bg-linear-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600',
                    darkColor: 'bg-linear-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500',
                    icon: 'GH'
                  },
                  {
                    provider: 'linkedin',
                    lightColor: 'bg-linear-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500',
                    darkColor: 'bg-linear-to-r from-blue-800 to-blue-700 hover:from-blue-700 hover:to-blue-600',
                    icon: 'LN'
                  },
                ].map((social) => (
                  <motion.button
                    key={social.provider}
                    onClick={() => handleSocialLogin(social.provider as 'google' | 'github' | 'linkedin')}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={cn(
                      "w-full text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center",
                      theme === 'light' ? social.lightColor : social.darkColor
                    )}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={cn(
            "px-8 py-6 border-t",
            "bg-linear-to-r from-gray-50/50 to-blue-50/50 border-gray-200",
            "dark:bg-linear-to-r dark:from-gray-900/50 dark:to-gray-800/50 dark:border-gray-800"
          )}>
            <p className={cn(
              "text-center",
              "text-gray-600",
              "dark:text-gray-400"
            )}>
              Don&apos;t have an account?{' '}
              <button
                onClick={()=> router.push('/register')}
                className="font-medium text-blue-600 hover:cursor-pointer hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Sign up
              </button>
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
            "bg-linear-to-r from-white/80 to-blue-50/80 border-gray-200",
            "dark:bg-linear-to-r dark:from-gray-900/80 dark:to-gray-800/80 dark:border-gray-800"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              "bg-linear-to-r from-blue-100 to-purple-100",
              "dark:bg-linear-to-r dark:from-blue-500/10 dark:to-purple-500/10"
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
                Access your account on the go
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
  );
}