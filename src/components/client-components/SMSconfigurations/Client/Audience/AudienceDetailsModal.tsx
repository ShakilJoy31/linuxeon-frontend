"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Edit,
    Users,
    Phone,
    MessageSquare,
    Hash,
    Send,
    Trash2,
    Plus,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useTheme } from "@/hooks/useThemeContext";
import {
    useSendSMSToAllAudienceMutation,
    useRemovePhoneNumbersMutation,
    // useAddPhoneNumbersMutation
} from "@/redux/api/sms-configurations/audienceApi";

interface AudienceDetailsModalProps {
    isOpen: boolean;
    audience: {
        id: number;
        configName: string;
        totalNumbers: number;
        createdAt: string;
        updatedAt: string;
        phoneNumbers: Array<{
            phoneNumber: string;
            message: string;
        }>;
    };
    client: {
        id: number;
        fullName: string;
        email: string;
        mobileNo: string;
    };
    onClose: () => void;
    onEdit: (audience: unknown) => void;
    onPhoneNumberClick: (data: { audienceId: number; phoneNumber: string; message: string }) => void;
}

const AudienceDetailsModal: React.FC<AudienceDetailsModalProps> = ({
    isOpen,
    audience,
    client,
    onClose,
    onEdit,
    onPhoneNumberClick,
}) => {
    const { theme } = useTheme();
    const [expandedPhoneNumbers, setExpandedPhoneNumbers] = useState<number[]>([]);
    const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
    const [isSending, setIsSending] = useState(false);
    const [showAddNumbers, setShowAddNumbers] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newMessage, setNewMessage] = useState("");

    const [sendSMSToAll] = useSendSMSToAllAudienceMutation();
    const [removePhoneNumbers] = useRemovePhoneNumbersMutation();
    // const [addPhoneNumbers] = useAddPhoneNumbersMutation();

    if (!isOpen || !audience) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const togglePhoneNumberExpansion = (index: number) => {
        setExpandedPhoneNumbers(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const toggleNumberSelection = (phoneNumber: string) => {
        setSelectedNumbers(prev =>
            prev.includes(phoneNumber)
                ? prev.filter(num => num !== phoneNumber)
                : [...prev, phoneNumber]
        );
    };

    const selectAllNumbers = () => {
        if (selectedNumbers.length === audience.phoneNumbers.length) {
            setSelectedNumbers([]);
        } else {
            setSelectedNumbers(audience.phoneNumbers.map((p: { phoneNumber: string }) => p.phoneNumber));
        }
    };

    const handleSendToAll = async () => {
        try {
            setIsSending(true);
            const result = await sendSMSToAll({
                clientId: client.id,
                id: audience.id
            }).unwrap();

            toast.success(`Sent ${result.data.sent} messages successfully`);
        } catch (error) {
            console.log(error)
            toast.error("Failed to send messages");
        } finally {
            setIsSending(false);
        }
    };

    const handleRemoveSelected = async () => {
        if (selectedNumbers.length === 0) {
            toast.error("Please select at least one phone number");
            return;
        }

        try {
            await removePhoneNumbers({
                clientId: client.id,
                id: audience.id,
                data: { phoneNumbers: selectedNumbers }
            }).unwrap();

            toast.success(`Removed ${selectedNumbers.length} phone numbers`);
            setSelectedNumbers([]);
            onClose(); // Close modal to refresh data
        } catch (error) {
            console.log(error)
            toast.error("Failed to remove phone numbers");
        }
    };

    const toggleAllExpanded = () => {
        if (expandedPhoneNumbers.length === audience.phoneNumbers.length) {
            setExpandedPhoneNumbers([]);
        } else {
            setExpandedPhoneNumbers(audience.phoneNumbers.map((_: unknown, index: number) => index));
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-start justify-center z-50 p-4 overflow-y-auto"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={`rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl ${theme === 'dark'
                        ? 'bg-gray-800 border-gray-700'
                        : 'bg-white border-gray-200'
                        } border`}
                >
                    {/* Header */}
                    <div className={`flex-shrink-0 p-6 border-b transition-colors duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className={`w-16 h-16 rounded-full overflow-hidden flex items-center justify-center transition-colors duration-300 ${theme === 'dark'
                                    ? 'bg-blue-500/20 border-2 border-blue-500/30'
                                    : 'bg-blue-50 border-2 border-blue-500'
                                    }`}>
                                    <Users size={32} className="text-blue-500" />
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {audience.configName}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {audience.totalNumbers} phone numbers
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className={`p-2 hover:cursor-pointer hover:bg-red-600 hover:text-red-200 border hover:border-red-600 rounded-full transition-colors duration-300 ${theme === 'dark'
                                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            {/* Audience Info */}
                            <div className={`rounded-lg p-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
                                }`}>
                                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    <Hash size={20} />
                                    Audience Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>SMS Configuration</p>
                                        <p className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>{audience.configName}</p>
                                    </div>
                                    <div>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>Total Phone Numbers</p>
                                        <p className={`text-lg font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>
                                            <Phone size={18} />
                                            {audience.totalNumbers}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>Created</p>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>{formatDate(audience.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                            }`}>Last Updated</p>
                                        <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                            }`}>{formatDate(audience.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Numbers Management */}
                            <div className={`rounded-lg overflow-hidden border transition-colors duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                                }`}>
                                <div className={`p-4 border-b transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                                    }`}>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h3 className={`text-lg font-semibold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                <Phone size={20} />
                                                Phone Numbers ({audience.phoneNumbers.length})
                                            </h3>
                                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                Click on a phone number to edit or send individual messages
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={toggleAllExpanded}
                                                className={`px-3 hover:cursor-pointer py-1.5 text-sm rounded transition-colors duration-300 flex items-center gap-1 ${theme === 'dark'
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {expandedPhoneNumbers.length === audience.phoneNumbers.length ? (
                                                    <>
                                                        <ChevronUp size={14} />
                                                        Collapse All
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown size={14} />
                                                        Expand All
                                                    </>
                                                )}
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setShowAddNumbers(!showAddNumbers)}
                                                className={`px-3 hover:cursor-pointer py-1.5 text-sm rounded transition-colors duration-300 flex items-center gap-1 ${theme === 'dark'
                                                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                                    }`}
                                            >
                                                <Plus size={14} />
                                                Add Number
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Add Phone Number Form */}
                                    {showAddNumbers && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={`mt-4 p-4 rounded-lg transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                                                }`}
                                        >
                                            <div className="space-y-4">
                                                <div>
                                                    <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                        }`}>
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newPhoneNumber}
                                                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                                                        placeholder="8801712345678"
                                                        className={`w-full px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${theme === 'dark'
                                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                            } border`}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className={`block text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                            }`}>
                                                            Message
                                                        </label>
                                                        {/* Add Use Config Message button here if you have config data available */}
                                                    </div>
                                                    <textarea
                                                        value={newMessage}
                                                        onChange={(e) => setNewMessage(e.target.value)}
                                                        placeholder="Enter message for this number..."
                                                        rows={3}
                                                        className={`w-full px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 resize-none ${theme === 'dark'
                                                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                                                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                                                            } border`}
                                                    />
                                                </div>
                                            </div>
                                            {/* ... rest of the code remains the same ... */}
                                        </motion.div>
                                    )}
                                </div>

                                {/* Phone Numbers List */}
                                <div className="max-h-96 overflow-y-auto">
                                    {audience.phoneNumbers.length === 0 ? (
                                        <div className={`p-8 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                            }`}>
                                            <Phone className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                            <p>No phone numbers added yet</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y transition-colors duration-300">
                                            {audience.phoneNumbers.map((phone: { phoneNumber: string, message: string }, index: number) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className={`transition-colors duration-300 ${theme === 'dark'
                                                        ? 'hover:bg-gray-800/50 border-gray-800'
                                                        : 'hover:bg-gray-50 border-gray-100'
                                                        } ${expandedPhoneNumbers.includes(index) ? 'bg-gray-50/50 dark:bg-gray-800/30' : ''}`}
                                                >
                                                    <div className="p-4">
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex items-start gap-3 flex-1">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedNumbers.includes(phone.phoneNumber)}
                                                                    onChange={() => toggleNumberSelection(phone.phoneNumber)}
                                                                    className={`mt-1 hover:cursor-pointer rounded focus:ring-blue-500 transition-colors duration-300 ${theme === 'dark'
                                                                        ? 'text-blue-500 bg-gray-700 border-gray-600'
                                                                        : 'text-blue-600 border-gray-300'
                                                                        }`}
                                                                />
                                                                <div
                                                                    className="flex-1 min-w-0 cursor-pointer"
                                                                    onClick={() => onPhoneNumberClick({
                                                                        audienceId: audience.id,
                                                                        phoneNumber: phone.phoneNumber,
                                                                        message: phone.message
                                                                    })}
                                                                >
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <Phone size={14} className={`flex-shrink-0 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                                            }`} />
                                                                        <code className={`text-sm font-mono font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                                                                            }`}>
                                                                            {phone.phoneNumber}
                                                                        </code>
                                                                    </div>
                                                                    {expandedPhoneNumbers.includes(index) && (
                                                                        <motion.div
                                                                            initial={{ opacity: 0, height: 0 }}
                                                                            animate={{ opacity: 1, height: "auto" }}
                                                                            exit={{ opacity: 0, height: 0 }}
                                                                            className="mt-2"
                                                                        >
                                                                            <div className="flex items-start gap-2">
                                                                                <MessageSquare size={12} className={`mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                                                                    }`} />
                                                                                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                                                    }`}>
                                                                                    {phone.message}
                                                                                </p>
                                                                            </div>
                                                                        </motion.div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => onPhoneNumberClick({
                                                                        audienceId: audience.id,
                                                                        phoneNumber: phone.phoneNumber,
                                                                        message: phone.message
                                                                    })}
                                                                    className={`p-1.5 hover:cursor-pointer rounded transition-colors duration-300 ${theme === 'dark'
                                                                        ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10'
                                                                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                                                                        }`}
                                                                    title="Edit/Send to this number"
                                                                >
                                                                    <Edit size={14} />
                                                                </motion.button>

                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => togglePhoneNumberExpansion(index)}
                                                                    className={`p-1.5 hover:cursor-pointer rounded transition-colors duration-300 ${theme === 'dark'
                                                                        ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                                                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                                                                        }`}
                                                                >
                                                                    {expandedPhoneNumbers.includes(index) ? (
                                                                        <ChevronUp size={14} />
                                                                    ) : (
                                                                        <ChevronDown size={14} />
                                                                    )}
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Selected Numbers Actions */}
                            {selectedNumbers.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-4 rounded-lg border transition-colors duration-300 ${theme === 'dark'
                                        ? 'bg-gray-900/50 border-gray-700'
                                        : 'bg-blue-50/50 border-blue-100'
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div>
                                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'
                                                }`}>
                                                {selectedNumbers.length} number{selectedNumbers.length !== 1 ? 's' : ''} selected
                                            </p>
                                            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                <button
                                                    onClick={selectAllNumbers}
                                                    className={`hover:underline ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                                        }`}
                                                >
                                                    {selectedNumbers.length === audience.phoneNumbers.length
                                                        ? 'Deselect all'
                                                        : 'Select all'}
                                                </button>
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleRemoveSelected}
                                                className={`px-3 py-1.5 text-sm hover:cursor-pointer rounded transition-colors duration-300 flex items-center gap-1 ${theme === 'dark'
                                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                                                    : 'bg-red-500 text-white hover:bg-red-600'
                                                    }`}
                                            >
                                                <Trash2 size={14} />
                                                Remove Selected
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`flex-shrink-0 p-6 border-t transition-colors duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Click on phone numbers to edit individual messages
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        onClose();
                                        onEdit(audience);
                                    }}
                                    className={`px-6 py-2 hover:cursor-pointer rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${theme === 'dark'
                                        ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                        }`}
                                >
                                    <Edit size={16} />
                                    Edit Audience
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSendToAll}
                                    disabled={isSending}
                                    className={`px-6 py-2 hover:cursor-pointer rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${theme === 'dark'
                                        ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30 disabled:opacity-50'
                                        : 'bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50'
                                        }`}
                                >
                                    <Send size={16} />
                                    {isSending ? "Sending..." : `Send to All (${audience.totalNumbers})`}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AudienceDetailsModal;