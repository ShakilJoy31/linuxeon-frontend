"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { X, Key, Hash, Globe, Calendar, Edit, Send, Power, Copy, CheckCircle } from 'lucide-react';
import { useTheme } from '@/hooks/useThemeContext';
import { CentralSMS } from '@/utils/interface/centralSmsConfiguration';

interface CentralSMSDetailsModalProps {
    isOpen: boolean;
    sms: CentralSMS | null;
    onClose: () => void;
    onEdit: (sms: CentralSMS) => void;
    onTestSMS: (sms: CentralSMS) => void;
    onToggleStatus: (sms: CentralSMS) => void;
}

const CentralSMSDetailsModal: React.FC<CentralSMSDetailsModalProps> = ({
    isOpen,
    sms,
    onClose,
    onEdit,
    onTestSMS,
    onToggleStatus
}) => {
    const { theme } = useTheme();
    const [copied, setCopied] = React.useState(false);

    if (!isOpen || !sms) return null;

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status: string) => {
        if (status === 'active') {
            return (
                <span className="px-3 py-1 text-sm rounded-full flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                    <CheckCircle size={14} />
                    Active
                </span>
            );
        } else {
            return (
                <span className="px-3 py-1 text-sm rounded-full flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400">
                    <Power size={14} />
                    Inactive
                </span>
            );
        }
    };

    const getTypeBadge = (type: string) => {
        const colors: { [key: string]: string } = {
            unicode: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
            text: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
            flash: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
        };
        return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400';
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Mask API key for display
    const maskAPIKey = (apiKey: string) => {
        if (!apiKey) return '';
        if (apiKey.length <= 8) return '•'.repeat(apiKey.length);
        const firstFour = apiKey.substring(0, 4);
        const lastFour = apiKey.substring(apiKey.length - 4);
        return `${firstFour}${'•'.repeat(6)}${lastFour}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
                    theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border shadow-2xl`}
            >
                {/* Header */}
                <div className={`sticky top-0 z-10 flex justify-between items-center p-6 border-b transition-colors duration-300 ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                    <div className="flex items-center gap-3">
                        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            SMS Configuration Details
                        </h2>
                        {getStatusBadge(sms.status)}
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-1 rounded-lg transition-colors duration-300 ${
                            theme === 'dark' 
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* App Name Section */}
                    <div className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                        <div className="flex items-center gap-2 mb-2">
                            <Key size={18} className="text-blue-500" />
                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Application Name
                            </span>
                        </div>
                        <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {sms.appName}
                        </p>
                    </div>

                    {/* API Key Section */}
                    <div className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Key size={18} className="text-purple-500" />
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    API Key
                                </span>
                            </div>
                            <button
                                onClick={() => copyToClipboard(sms.apiKey)}
                                className={`p-1.5 rounded transition-colors duration-300 ${
                                    theme === 'dark'
                                    ? 'hover:bg-gray-600 text-gray-400 hover:text-white'
                                    : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                                }`}
                                title="Copy API Key"
                            >
                                {copied ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                            </button>
                        </div>
                        <p className={`font-mono text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {maskAPIKey(sms.apiKey)}
                        </p>
                    </div>

                    {/* Sender ID & Type Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg ${
                            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <Hash size={18} className="text-green-500" />
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Sender ID
                                </span>
                            </div>
                            <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {sms.senderId}
                            </p>
                        </div>

                        <div className={`p-4 rounded-lg ${
                            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Message Type
                                </span>
                            </div>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getTypeBadge(sms.type)}`}>
                                {sms.type.charAt(0).toUpperCase() + sms.type.slice(1)}
                            </span>
                        </div>
                    </div>

                    {/* Message Template */}
                    <div className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Message Template
                            </span>
                        </div>
                        <div className={`p-3 rounded-lg font-mono text-sm whitespace-pre-wrap ${
                            theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700'
                        }`}>
                            {sms.message}
                        </div>
                    </div>

                    {/* Base URL */}
                    <div className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                        <div className="flex items-center gap-2 mb-2">
                            <Globe size={18} className="text-cyan-500" />
                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                Base URL
                            </span>
                        </div>
                        <p className={`text-sm break-all ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {sms.baseUrl}
                        </p>
                    </div>

                    {/* Timestamps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg ${
                            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar size={18} className="text-gray-500" />
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Created At
                                </span>
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                {formatDate(sms.createdAt)}
                            </p>
                        </div>

                        <div className={`p-4 rounded-lg ${
                            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar size={18} className="text-gray-500" />
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Last Updated
                                </span>
                            </div>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                {formatDate(sms.updatedAt)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={`sticky bottom-0 flex gap-3 p-6 border-t transition-colors duration-300 ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            onClose();
                            onEdit(sms);
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
                            theme === 'dark'
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                    >
                        <Edit size={18} />
                        Edit Configuration
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            onClose();
                            onTestSMS(sms);
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
                            theme === 'dark'
                            ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30'
                            : 'bg-purple-500 text-white hover:bg-purple-600'
                        }`}
                    >
                        <Send size={18} />
                        Test SMS
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            onClose();
                            onToggleStatus(sms);
                        }}
                        className={`flex-1 py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
                            theme === 'dark'
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30'
                            : sms.status === 'active'
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                    >
                        <Power size={18} />
                        {sms.status === 'active' ? 'Deactivate' : 'Activate'}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CentralSMSDetailsModal;