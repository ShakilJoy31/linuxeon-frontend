// components/admin/SMSHistory.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Calendar,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Phone,
    MessageSquare,
    CheckCircle,
    XCircle,
    AlertCircle,
    Settings,
    FileText,
    Copy,
    DollarSign,
    BarChart3,
    TrendingUp,
    TrendingDown,
    Smartphone,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/hooks/useThemeContext';
import { SMSHistoryFilters } from '@/utils/interface/smsHistoryInterface';
import { useGetSMSHistoryQuery } from '@/redux/api/sms-configurations/smsApi';

const SMSHistoryComponent: React.FC = () => {
    const { theme } = useTheme();
    const [filters, setFilters] = useState<SMSHistoryFilters>({
        page: 1,
        limit: 20,
        clientId: '',
        configId: '',
        phoneNumber: '',
        messageType: undefined,
        status: undefined,
        deliveryStatus: undefined,
        startDate: '',
        endDate: '',
        search: '',
        sortBy: 'sentAt',
        sortOrder: 'DESC'
    });

    const [showFilters, setShowFilters] = useState(false);
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Use the query hook
    const {
        data: historyData,
        isLoading,
        isError,
        refetch,
        isFetching
    } = useGetSMSHistoryQuery(filters, {
        refetchOnMountOrArgChange: true,
    });

    const history = historyData?.data?.history || [];
    const pagination = historyData?.data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 20,
        hasNextPage: false,
        hasPreviousPage: false
    };

    // Handle filter changes
    const handleFilterChange = (key: keyof SMSHistoryFilters, value: unknown) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: 1 // Reset to first page on filter change
        }));
    };

    // Handle pagination
    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    // Toggle row expansion
    const toggleRowExpansion = (id: number) => {
        setExpandedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    // Toggle row selection
    const toggleRowSelection = (id: number) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    // Select all rows
    const selectAllRows = () => {
        if (selectedRows.length === history.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(history.map(item => item.id));
        }
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            page: 1,
            limit: 20,
            clientId: '',
            configId: '',
            phoneNumber: '',
            messageType: undefined,
            status: undefined,
            deliveryStatus: undefined,
            startDate: '',
            endDate: '',
            search: '',
            sortBy: 'sentAt',
            sortOrder: 'DESC'
        });
        setSelectedRows([]);
        setExpandedRows([]);
    };

    // Copy message to clipboard
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard`);
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Format time ago
    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        } else {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        }
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'sent':
                return theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-blue-100 text-blue-700 border-blue-200';
            case 'delivered':
                return theme === 'dark'
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-green-100 text-green-700 border-green-200';
            case 'failed':
                return theme === 'dark'
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : 'bg-red-100 text-red-700 border-red-200';
            case 'pending':
                return theme === 'dark'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default:
                return theme === 'dark'
                    ? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    : 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    // Get delivery status color
    const getDeliveryStatusColor = (status: string) => {
        switch (status) {
            case 'delivered':
                return theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'failed':
                return theme === 'dark'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-rose-100 text-rose-700 border-rose-200';
            case 'pending':
                return theme === 'dark'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-amber-100 text-amber-700 border-amber-200';
            default:
                return theme === 'dark'
                    ? 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    : 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    // Get message type color
    const getMessageTypeColor = (type: string) => {
        return type === 'custom'
            ? theme === 'dark'
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                : 'bg-purple-100 text-purple-700 border-purple-200'
            : theme === 'dark'
                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                : 'bg-indigo-100 text-indigo-700 border-indigo-200';
    };

    // Calculate statistics
    const calculateStats = () => {
        const total = history.length;
        const delivered = history.filter(h => h.deliveryStatus === 'delivered').length;
        const failed = history.filter(h => h.deliveryStatus === 'failed').length;
        const pending = history.filter(h => h.deliveryStatus === 'pending').length;
        const customMessages = history.filter(h => h.messageType === 'custom').length;
        const configMessages = history.filter(h => h.messageType === 'config').length;
        const totalCost = history.reduce((sum, h) => sum + parseFloat(h.cost || '0'), 0);
        const totalSmsSegments = history.reduce((sum, h) => sum + h.smsCount, 0);

        return {
            total,
            delivered,
            failed,
            pending,
            customMessages,
            configMessages,
            totalCost,
            totalSmsSegments,
            deliveryRate: total > 0 ? (delivered / total) * 100 : 0
        };
    };

    const stats = calculateStats();

    // Loading state
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[600px] flex items-center justify-center"
            >
                <div className="text-center">
                    <div className="relative inline-block">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-blue-500/30 rounded-full"
                        />
                        <Settings className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className={`mt-4 text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Loading SMS History...
                    </p>
                </div>
            </motion.div>
        );
    }

    // Error state
    if (isError) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-[600px] flex items-center justify-center"
            >
                <div className={`text-center p-8 rounded-2xl max-w-md ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'}`}>
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Failed to Load History
                    </h3>
                    <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Unable to load SMS history. Please check your connection and try again.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => refetch()}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 mx-auto ${theme === 'dark'
                            ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        <RefreshCw size={18} />
                        Retry
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6 py-4 ">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
            >
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                            <FileText className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                SMS History
                            </h1>
                            <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Track and analyze all SMS messages sent through the system
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${theme === 'dark'
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm'
                            }`}
                    >
                        <Filter size={18} />
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                        {Object.values(filters).filter(v => v && v !== '' && v !== 1 && v !== 20 && v !== 'sentAt' && v !== 'DESC').length > 0 && (
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                                {Object.values(filters).filter(v => v && v !== '' && v !== 1 && v !== 20 && v !== 'sentAt' && v !== 'DESC').length}
                            </span>
                        )}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${theme === 'dark'
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 disabled:opacity-50'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm disabled:opacity-50'
                            }`}
                    >
                        <RefreshCw size={18} className={isFetching ? 'animate-spin' : ''} />
                        Refresh
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {/* Total SMS Card */}
                <div className={`rounded-2xl p-5 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                        </div>
                        {stats.deliveryRate >= 80 ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        ) : stats.deliveryRate >= 50 ? (
                            <TrendingUp className="w-5 h-5 text-yellow-500" />
                        ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                        )}
                    </div>
                    <div className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{stats.total}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total SMS</div>
                    <div className="mt-3 pt-3 border-t border-gray-700/30 dark:border-gray-700">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500 dark:text-gray-400">Delivery Rate</span>
                            <span className="font-medium text-gray-900 dark:text-white">{stats.deliveryRate.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                {/* Delivered Card */}
                <div className={`rounded-2xl p-5 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50'}`}>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                            {stats.delivered > 0 ? ((stats.delivered / stats.total) * 100).toFixed(0) : 0}%
                        </div>
                    </div>
                    <div className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{stats.delivered}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Delivered</div>
                </div>

                {/* Failed Card */}
                <div className={`rounded-2xl p-5 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'}`}>
                            <XCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-red-500/20 text-red-600 dark:text-red-400">
                            {stats.failed > 0 ? ((stats.failed / stats.total) * 100).toFixed(0) : 0}%
                        </div>
                    </div>
                    <div className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{stats.failed}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
                </div>

                {/* Cost Card */}
                <div className={`rounded-2xl p-5 ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}>
                    <div className="flex items-center justify-between mb-3">
                        <div className={`p-2.5 rounded-xl ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-50'}`}>
                            <DollarSign className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                            {stats.totalSmsSegments} SMS
                        </div>
                    </div>
                    <div className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">${stats.totalCost.toFixed(2)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Cost</div>
                </div>
            </motion.div>

            {/* Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`overflow-hidden rounded-2xl border ${theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50/50'}`}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    Filter SMS History
                                </h3>
                                <button
                                    onClick={clearFilters}
                                    className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${theme === 'dark'
                                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                        }`}
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Search */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Search
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <input
                                            type="text"
                                            value={filters.search || ''}
                                            onChange={(e) => handleFilterChange('search', e.target.value)}
                                            placeholder="Search messages or phone numbers..."
                                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${theme === 'dark'
                                                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                        />
                                    </div>
                                </div>

                                {/* Client ID */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Client ID
                                    </label>
                                    <input
                                        type="number"
                                        value={filters.clientId || ''}
                                        onChange={(e) => handleFilterChange('clientId', e.target.value)}
                                        placeholder="Enter client ID..."
                                        className={`w-full px-4 py-2.5 rounded-lg border ${theme === 'dark'
                                            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={filters.phoneNumber || ''}
                                        onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
                                        placeholder="Enter phone number..."
                                        className={`w-full px-4 py-2.5 rounded-lg border ${theme === 'dark'
                                            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    />
                                </div>

                                {/* Message Type */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Message Type
                                    </label>
                                    <select
                                        value={filters.messageType || ''}
                                        onChange={(e) => handleFilterChange('messageType', e.target.value || undefined)}
                                        className={`w-full px-4 py-2.5 rounded-lg border ${theme === 'dark'
                                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    >
                                        <option value="">All Types</option>
                                        <option value="custom">Custom Message</option>
                                        <option value="config">Config Message</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Status
                                    </label>
                                    <select
                                        value={filters.status || ''}
                                        onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                                        className={`w-full px-4 py-2.5 rounded-lg border ${theme === 'dark'
                                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    >
                                        <option value="">All Status</option>
                                        <option value="sent">Sent</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="failed">Failed</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>

                                {/* Delivery Status */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Delivery Status
                                    </label>
                                    <select
                                        value={filters.deliveryStatus || ''}
                                        onChange={(e) => handleFilterChange('deliveryStatus', e.target.value || undefined)}
                                        className={`w-full px-4 py-2.5 rounded-lg border ${theme === 'dark'
                                            ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                    >
                                        <option value="">All Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="failed">Failed</option>
                                        <option value="pending">Pending</option>
                                        <option value="unknown">Unknown</option>
                                    </select>
                                </div>

                                {/* Date Range */}
                                <div className="md:col-span-2">
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Date Range
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs text-gray-500">From</span>
                                            </div>
                                            <input
                                                type="date"
                                                value={filters.startDate || ''}
                                                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                                className={`w-full px-4 py-2.5 rounded-lg border ${theme === 'dark'
                                                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                                                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <span className="text-xs text-gray-500">To</span>
                                            </div>
                                            <input
                                                type="date"
                                                value={filters.endDate || ''}
                                                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                                className={`w-full px-4 py-2.5 rounded-lg border ${theme === 'dark'
                                                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500'
                                                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-2xl overflow-hidden border ${theme === 'dark' ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-white'}`}
            >
                {/* Table Header */}
                <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                SMS Messages
                            </h3>
                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Showing {history.length} of {pagination.totalItems} messages
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {selectedRows.length > 0 && (
                                <div className={`px-3 py-1.5 rounded-lg ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                                    <span className="text-sm font-medium">{selectedRows.length} selected</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <select
                                    value={filters.limit}
                                    onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                                    className={`px-3 py-1.5 rounded-lg border ${theme === 'dark'
                                        ? 'bg-gray-800 border-gray-700 text-white'
                                        : 'bg-white border-gray-300 text-gray-700'
                                        } text-sm`}
                                >
                                    <option value="10">10 per page</option>
                                    <option value="20">20 per page</option>
                                    <option value="50">50 per page</option>
                                    <option value="100">100 per page</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <th className="py-4 px-6 text-left">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.length === history.length && history.length > 0}
                                            onChange={selectAllRows}
                                            className={`rounded ${theme === 'dark'
                                                ? 'text-blue-500 bg-gray-700 border-gray-600'
                                                : 'text-blue-600 border-gray-300'
                                                }`}
                                        />
                                        <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Select
                                        </span>
                                    </div>
                                </th>
                                <th className="py-4 px-6 text-left">
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Phone Number
                                    </span>
                                </th>
                                <th className="py-4 px-6 text-left">
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Message
                                    </span>
                                </th>
                                <th className="py-4 px-6 text-left">
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Status
                                    </span>
                                </th>
                                <th className="py-4 px-6 text-left">
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Type
                                    </span>
                                </th>
                                <th className="py-4 px-6 text-left">
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Date & Time
                                    </span>
                                </th>
                                <th className="py-4 px-6 text-left">
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Actions
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 px-6 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <MessageSquare className={`w-16 h-16 ${theme === 'dark' ? 'text-gray-700' : 'text-gray-300'} mb-4`} />
                                            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                No SMS History Found
                                            </h3>
                                            <p className={`max-w-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {Object.values(filters).some(v => v && v !== '' && v !== 1 && v !== 20 && v !== 'sentAt' && v !== 'DESC')
                                                    ? 'Try adjusting your filters to see more results.'
                                                    : 'No SMS messages have been sent yet.'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                history.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <motion.tr
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800/30' : 'border-gray-200 hover:bg-gray-50'} ${selectedRows.includes(item.id) ? (theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50') : ''}`}
                                        >
                                            {/* Checkbox */}
                                            <td className="py-4 px-6">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(item.id)}
                                                    onChange={() => toggleRowSelection(item.id)}
                                                    className={`rounded ${theme === 'dark'
                                                        ? 'text-blue-500 bg-gray-700 border-gray-600'
                                                        : 'text-blue-600 border-gray-300'
                                                        }`}
                                                />
                                            </td>

                                            {/* Phone Number */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                                        <Phone className="w-4 h-4 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                            {item.phoneNumber}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            Client: {item.clientId} • Config: {item.configId}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Message Preview */}
                                            <td className="py-4 px-6">
                                                <div className="max-w-xs">
                                                    <div className="font-medium text-gray-900 dark:text-white line-clamp-2">
                                                        {item.message.length > 100
                                                            ? `${item.message.substring(0, 100)}...`
                                                            : item.message}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${getMessageTypeColor(item.messageType)}`}>
                                                            {item.messageType === 'custom' ? 'Custom' : 'Config'}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {item.characterCount} chars • {item.smsCount} SMS
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col gap-2">
                                                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                                                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                    </span>
                                                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border ${getDeliveryStatusColor(item.deliveryStatus)}`}>
                                                        {item.deliveryStatus.charAt(0).toUpperCase() + item.deliveryStatus.slice(1)}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Type & Cost */}
                                            <td className="py-4 px-6">
                                                <div className="space-y-2">
                                                    <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        ${parseFloat(item.cost || '0').toFixed(2)}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatTimeAgo(item.sentAt)}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Date & Time */}
                                            <td className="py-4 px-6">
                                                <div className="space-y-1">
                                                    <div className="font-medium text-gray-900 dark:text-white">
                                                        {new Date(item.sentAt).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => toggleRowExpansion(item.id)}
                                                        className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                                                            }`}
                                                        title={expandedRows.includes(item.id) ? 'Collapse' : 'Expand'}
                                                    >
                                                        {expandedRows.includes(item.id) ? (
                                                            <ChevronUp className="w-4 h-4" />
                                                        ) : (
                                                            <ChevronDown className="w-4 h-4" />
                                                        )}
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => copyToClipboard(item.message, 'Message')}
                                                        className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                                                            }`}
                                                        title="Copy message"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </motion.button>

                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => copyToClipboard(item.phoneNumber, 'Phone number')}
                                                        className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                                                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                                                            }`}
                                                        title="Copy phone number"
                                                    >
                                                        <Smartphone className="w-4 h-4" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>

                                        {/* Expanded Row Details */}
                                        <AnimatePresence>
                                            {expandedRows.includes(item.id) && (
                                                <motion.tr
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className={`${theme === 'dark' ? 'bg-gray-900/30' : 'bg-gray-50/50'}`}
                                                >
                                                    <td colSpan={7} className="px-6 py-4">
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                            {/* Message Details */}
                                                            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                                                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                                    Message Details
                                                                </h4>
                                                                <div className="space-y-3">
                                                                    <div>
                                                                        <label className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                            Full Message
                                                                        </label>
                                                                        <div className={`mt-1 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                                                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
                                                                                {item.message}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                            <label className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                                Character Count
                                                                            </label>
                                                                            <p className={`mt-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                                                {item.characterCount}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <label className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                                SMS Segments
                                                                            </label>
                                                                            <p className={`mt-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                                                {item.smsCount}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Gateway Response */}
                                                            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                                                <h4 className={`font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                                    Gateway Response
                                                                </h4>
                                                                <div className="space-y-3">
                                                                    <div>
                                                                        <label className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                            Message ID
                                                                        </label>
                                                                        <p className={`mt-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} break-all`}>
                                                                            {item.gatewayMessageId || 'N/A'}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <label className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                            Response
                                                                        </label>
                                                                        <div className={`mt-1 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                                                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} break-all`}>
                                                                                {item.gatewayResponse || 'No response recorded'}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                            <label className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                                Cost
                                                                            </label>
                                                                            <p className={`mt-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                                                ${parseFloat(item.cost || '0').toFixed(2)}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <label className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                                                Sent At
                                                                            </label>
                                                                            <p className={`mt-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                                                {formatDate(item.sentAt)}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className={`px-6 py-4 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                                {pagination.totalItems} entries
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={!pagination.hasPreviousPage}
                                    className={`p-2 rounded-lg transition-all duration-300 ${theme === 'dark'
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-700'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-300 shadow-sm'
                                        }`}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </motion.button>

                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (pagination.totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (pagination.currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                                        pageNum = pagination.totalPages - 4 + i;
                                    } else {
                                        pageNum = pagination.currentPage - 2 + i;
                                    }

                                    return (
                                        <motion.button
                                            key={pageNum}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-10 h-10 rounded-lg transition-all duration-300 ${pagination.currentPage === pageNum
                                                ? theme === 'dark'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-blue-500 text-white'
                                                : theme === 'dark'
                                                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'
                                                }`}
                                        >
                                            {pageNum}
                                        </motion.button>
                                    );
                                })}

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={!pagination.hasNextPage}
                                    className={`p-2 rounded-lg transition-all duration-300 ${theme === 'dark'
                                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-700'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-300 shadow-sm'
                                        }`}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default SMSHistoryComponent;