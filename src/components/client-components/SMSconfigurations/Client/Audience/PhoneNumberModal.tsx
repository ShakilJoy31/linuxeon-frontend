"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save, Phone, MessageSquare, Send, Calendar, Clock, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { useTheme } from "@/hooks/useThemeContext";
import { useSendSMSToAudienceMutation } from "@/redux/api/sms-configurations/audienceApi";
import { useGetSMSByIdQuery } from "@/redux/api/sms-configurations/smsApi";

interface PhoneNumberModalProps {
    isOpen: boolean;
    clientId: string | number;
    audienceId: number;
    phoneNumber: string;
    message: string;
    configId?: string | number; // Add configId to fetch the config message
    onClose: () => void;
    onUpdate: () => void;
}

const PhoneNumberModal: React.FC<PhoneNumberModalProps> = ({
    isOpen,
    clientId,
    audienceId,
    phoneNumber: initialPhoneNumber,
    message: initialMessage,
    configId, // Get configId from props
    onClose,
    onUpdate
}) => {
    const { theme } = useTheme();
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
    const [message, setMessage] = useState(initialMessage);
    const [scheduledTime, setScheduledTime] = useState("");
    const [isScheduling, setIsScheduling] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [useConfigMessage, setUseConfigMessage] = useState(false);

    const [sendSMS] = useSendSMSToAudienceMutation();

    // Fetch SMS config data if configId is provided
    const { data: smsConfigData } = useGetSMSByIdQuery(
        { clientId, id: configId || 0 },
        { skip: !configId || !isOpen }
    );

    // Get the config message from the SMS config
    const configMessage = smsConfigData?.data?.message || "";

    // Reset useConfigMessage when modal opens
    useEffect(() => {
        if (isOpen) {
            setPhoneNumber(initialPhoneNumber);
            setMessage(initialMessage);
            setUseConfigMessage(false);
        }
    }, [isOpen, initialPhoneNumber, initialMessage]);

    const handleSendSMS = async () => {
        try {
            setIsSending(true);

            await sendSMS({
                clientId,
                id: audienceId,
                data: { phoneNumbers: [phoneNumber] }
            }).unwrap();

            toast.success("SMS sent successfully!");
            onUpdate();
            onClose();
        } catch (error) {
            toast.error("Failed to send SMS");
        } finally {
            setIsSending(false);
        }
    };

    const handleScheduleSMS = () => {
        if (!scheduledTime) {
            toast.error("Please select a schedule time");
            return;
        }

        toast.success(`SMS scheduled for ${new Date(scheduledTime).toLocaleString()}`);
        // Here you would implement actual scheduling logic
    };

    const handleUseConfigMessage = () => {
        if (configMessage) {
            setMessage(configMessage);
            setUseConfigMessage(true);
            toast.success("Config message applied!");
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`rounded-xl w-full max-w-md shadow-2xl ${theme === 'dark'
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                    } border`}
            >
                {/* Header */}
                <div className={`p-6 border-b transition-colors duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                                }`}>
                                <Phone className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    Phone Number Details
                                </h2>
                                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                    Edit or send message to this number
                                </p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className={`p-2 rounded-full transition-colors duration-300 ${theme === 'dark'
                                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <X size={20} />
                        </motion.button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Phone Number Input */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={`w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } border`}
                            />
                        </div>
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Message
                            </label>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                    {message.length} characters
                                </span>
                                {configMessage && (
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleUseConfigMessage}
                                        className={`text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors duration-300 ${theme === 'dark'
                                                ? useConfigMessage
                                                    ? 'bg-blue-500/30 text-blue-400 border border-blue-500/50'
                                                    : 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/20'
                                                : useConfigMessage
                                                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                                    : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                                            }`}
                                    >
                                        {useConfigMessage ? (
                                            <>
                                                <Check size={12} />
                                                Using Config
                                            </>
                                        ) : (
                                            <>
                                                <MessageSquare size={12} />
                                                Use Config
                                            </>
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            <MessageSquare className="absolute top-3 left-3 text-gray-400 h-4 w-4" />
                            <textarea
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    if (useConfigMessage && e.target.value !== configMessage) {
                                        setUseConfigMessage(false);
                                    }
                                }}
                                maxLength={500}
                                rows={4}
                                className={`w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 resize-none ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                    } border`}
                                placeholder={configMessage || "Type your message here..."}
                            />
                        </div>
                        {configMessage && (
                            <div className="mt-2">
                                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <span className="font-medium">Config message:</span> {configMessage.substring(0, 60)}
                                    {configMessage.length > 60 ? "..." : ""}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Schedule Option */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <input
                                type="checkbox"
                                id="schedule"
                                checked={isScheduling}
                                onChange={(e) => setIsScheduling(e.target.checked)}
                                className={`w-4 h-4 rounded focus:ring-blue-500 transition-colors duration-300 ${theme === 'dark'
                                        ? 'text-blue-500 bg-gray-700 border-gray-600'
                                        : 'text-blue-600 border-gray-300'
                                    }`}
                            />
                            <label htmlFor="schedule" className={`text-sm flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                <Calendar size={14} />
                                Schedule for later
                            </label>
                        </div>

                        {isScheduling && (
                            <div className="space-y-2">
                                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                    Schedule Time
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="datetime-local"
                                        value={scheduledTime}
                                        onChange={(e) => setScheduledTime(e.target.value)}
                                        min={new Date().toISOString().slice(0, 16)}
                                        className={`w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${theme === 'dark'
                                                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                            } border`}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className={`p-6 border-t transition-colors duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className={`flex-1 hover:cursor-pointer px-4 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${theme === 'dark'
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <X size={18} />
                            Cancel
                        </motion.button>

                        {isScheduling ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleScheduleSMS}
                                className={`flex-1 hover:cursor-pointer px-4 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${theme === 'dark'
                                        ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30'
                                        : 'bg-purple-500 text-white hover:bg-purple-600'
                                    }`}
                            >
                                <Calendar size={18} />
                                Schedule SMS
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSendSMS}
                                disabled={isSending}
                                className={`flex-1 px-4 hover:cursor-pointer py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${theme === 'dark'
                                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 disabled:opacity-50'
                                        : 'bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50'
                                    }`}
                            >
                                <Send size={18} />
                                {isSending ? "Sending..." : "Send SMS Now"}
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PhoneNumberModal;