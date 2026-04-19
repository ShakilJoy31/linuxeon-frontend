"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/hooks/useThemeContext';
import { useCreateCentralSMSMutation, useUpdateCentralSMSMutation } from '@/redux/api/sms-configurations/centralSmsApi';
import { CentralSMS } from '@/utils/interface/centralSmsConfiguration';

interface AddEditCentralSMSModalProps {
    smsData?: CentralSMS | null;
    isOpen: boolean;
    onClose: (refreshData?: boolean) => void;
}

const typeOptions = [
    { value: "unicode", label: "Unicode", description: "Supports Bangla and special characters" },
    { value: "text", label: "Text", description: "Plain text messages (160 chars)" },
    { value: "flash", label: "Flash", description: "Messages that appear directly on screen" }
];

const AddEditCentralSMSModal: React.FC<AddEditCentralSMSModalProps> = ({
    smsData,
    isOpen,
    onClose
}) => {
    const { theme } = useTheme();
    const isEditing = !!smsData;

    const [formData, setFormData] = useState({
        appName: '',
        apiKey: '',
        type: 'unicode',
        senderId: '',
        message: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [createSMS, { isLoading: isCreating }] = useCreateCentralSMSMutation();
    const [updateSMS, { isLoading: isUpdating }] = useUpdateCentralSMSMutation();

    useEffect(() => {
        if (smsData) {
            setFormData({
                appName: smsData.appName || '',
                apiKey: smsData.apiKey || '',
                type: smsData.type || 'unicode',
                senderId: smsData.senderId || '',
                message: smsData.message || ''
            });
        } else {
            setFormData({
                appName: '',
                apiKey: '',
                type: 'unicode',
                senderId: '',
                message: ''
            });
        }
        setErrors({});
    }, [smsData, isOpen]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.appName.trim()) {
            newErrors.appName = 'App name is required';
        } else if (formData.appName.length < 2 || formData.appName.length > 100) {
            newErrors.appName = 'App name must be between 2 and 100 characters';
        }

        if (!formData.apiKey.trim()) {
            newErrors.apiKey = 'API key is required';
        } else if (formData.apiKey.length < 10) {
            newErrors.apiKey = 'API key must be at least 10 characters long';
        }

        if (!formData.senderId.trim()) {
            newErrors.senderId = 'Sender ID is required';
        } else if (formData.senderId.length < 3 || formData.senderId.length > 20) {
            newErrors.senderId = 'Sender ID must be between 3 and 20 characters';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            if (isEditing && smsData) {
                await updateSMS({
                    id: smsData.id,
                    data: formData
                }).unwrap();
                toast.success('SMS configuration updated successfully!');
            } else {
                await createSMS(formData).unwrap();
                toast.success('SMS configuration created successfully!');
            }
            onClose(true);
        } catch (error) {
            console.error('Submit error:', error);
            const errorMessage = error?.data?.message || 'Failed to save SMS configuration';
            toast.error(errorMessage);
            
            if (error?.data?.message?.includes('service already exists')) {
                setErrors(prev => ({ ...prev, service: 'A configuration with this service already exists' }));
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    if (!isOpen) return null;

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
                className={`rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide transition-colors duration-300 ${
                    theme === 'dark' 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                } border shadow-2xl`}
            >
                {/* Header */}
                <div className={`sticky top-0 z-10 flex justify-between items-center p-6 border-b transition-colors duration-300 ${
                    theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                    <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {isEditing ? 'Edit SMS Configuration' : 'Add New SMS Configuration'}
                    </h2>
                    <button
                        onClick={() => onClose()}
                        className={`p-1 rounded-lg cursor-pointer transition-colors duration-300 ${
                            theme === 'dark' 
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* App Name */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            App Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="appName"
                            value={formData.appName}
                            onChange={handleChange}
                            placeholder="e.g., Linuxeon SMS Gateway"
                            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                errors.appName
                                    ? 'border-red-500 ring-1 ring-red-500'
                                    : theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                            } border`}
                        />
                        {errors.appName && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.appName}
                            </p>
                        )}
                    </div>

                    {/* API Key */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            API Key <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="apiKey"
                            value={formData.apiKey}
                            onChange={handleChange}
                            placeholder="Enter your SMS gateway API key"
                            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                errors.apiKey
                                    ? 'border-red-500 ring-1 ring-red-500'
                                    : theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                            } border`}
                        />
                        {errors.apiKey && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.apiKey}
                            </p>
                        )}
                        <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            The API key provided by your SMS service provider
                        </p>
                    </div>

                    {/* Sender ID */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Sender ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="senderId"
                            value={formData.senderId}
                            onChange={handleChange}
                            placeholder="e.g., Linuxeon"
                            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                errors.senderId
                                    ? 'border-red-500 ring-1 ring-red-500'
                                    : theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                            } border`}
                        />
                        {errors.senderId && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.senderId}
                            </p>
                        )}
                        <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            3-20 characters. This will appear as the sender name on recipient&apos;s phones
                        </p>
                    </div>

                    {/* Message Type */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Message Type
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {typeOptions.map(option => (
                                <label
                                    key={option.value}
                                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                        formData.type === option.value
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : theme === 'dark'
                                            ? 'border-gray-600 hover:border-gray-500'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="type"
                                        value={option.value}
                                        checked={formData.type === option.value}
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                    <div className="flex-1">
                                        <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            {option.label}
                                        </div>
                                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {option.description}
                                        </div>
                                    </div>
                                    {formData.type === option.value && (
                                        <CheckCircle size={16} className="text-blue-500" />
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Message Template */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Message Template <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Enter the SMS message template. You can use variables like {{name}}, {{amount}}, {{dueDate}} etc."
                            className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                                errors.message
                                    ? 'border-red-500 ring-1 ring-red-500'
                                    : theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500'
                            } border resize-none`}
                        />
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle size={14} />
                                {errors.message}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onClose()}
                            className={`flex-1 py-2.5 cursor-pointer px-4 rounded-lg transition-colors duration-300 ${
                                theme === 'dark'
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isCreating || isUpdating}
                            className={`flex-1 cursor-pointer py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
                                theme === 'dark'
                                ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {(isCreating || isUpdating) ? (
                                <>
                                    <Loader size={18} className="animate-spin" />
                                    {isEditing ? 'Updating...' : 'Creating...'}
                                </>
                            ) : (
                                isEditing ? 'Update Configuration' : 'Create Configuration'
                            )}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddEditCentralSMSModal;