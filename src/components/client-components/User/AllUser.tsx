// src/app/admin/clients/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
    motion,
    AnimatePresence,
    LayoutGroup
} from 'framer-motion';
import {
    Search,
    Filter,
    User,
    Mail,
    Phone,
    Calendar,
    Shield,
    AlertCircle,
    CheckCircle,
    XCircle,
    Download,
    RefreshCw,
    Edit,
    Trash2,
    Eye,
    UserCheck,
    UserX,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useDeleteClientMutation, useGetAllClientsQuery, useUpdateClientStatusMutation } from '@/redux/api/authentication/authApi';
import { useTheme } from '@/hooks/useThemeContext';
import { useRouter } from 'next/navigation';

// Types
interface Client {
    id: number;
    fullName: string;
    photo: string;
    dateOfBirth: string;
    age: number;
    sex: string;
    nidOrPassportNo: string;
    mobileNo: string;
    email: string;
    role: string;
    status: 'active' | 'pending' | 'inactive';
    createdAt: string;
    updatedAt: string;
    nidPhoto: {
        frontSide: string;
        backSide: string;
    };
}

//! Client Card Component
function ClientCard({ client, onView, onEdit, onDelete, onStatusChange }: {
    client: Client;
    onView: (client: Client) => void;
    onEdit: (client: Client) => void;
    onDelete: (client: Client) => void;
    onStatusChange: (client: Client, status: 'active' | 'pending' | 'inactive') => void;
}) {
    const router = useRouter(); 
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative"
        >
            {/* Glowing background effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 dark:group-hover:from-blue-500/5 dark:group-hover:via-purple-500/5 dark:group-hover:to-blue-500/5 rounded-2xl blur-xl transition-all duration-500" />

            {/* Main card */}
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-100 dark:group-hover:shadow-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-900/50 overflow-hidden">

                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/5 dark:to-purple-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated border gradient */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-4">
                            {/* Avatar with status indicator */}
                            <div className="relative">
                                {/* Avatar ring animation */}
                                <motion.div
                                    className="absolute -inset-1 border-2 border-blue-400/30 dark:border-blue-500/30 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Avatar */}
                                <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {client.photo ? (
                                        <img
                                            src={client.photo}
                                            alt={client.fullName}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-7 h-7" />
                                    )}

                                    {/* Online status indicator */}
                                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${client.status === 'active' ? 'bg-emerald-500' :
                                        client.status === 'pending' ? 'bg-amber-500' :
                                            'bg-rose-500'
                                        }`}>
                                        {client.status === 'active' && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full bg-emerald-500"
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Client info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {client.fullName}
                                </h3>

                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${client.status === 'active'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800'
                                        : client.status === 'pending'
                                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
                                            : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800'
                                        }`}>
                                        {client.status === 'active' && <CheckCircle className="w-3 h-3" />}
                                        {client.status === 'pending' && <AlertCircle className="w-3 h-3" />}
                                        {client.status === 'inactive' && <XCircle className="w-3 h-3" />}
                                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                                    </span>
                                </div>

                                <div className='my-2 mr-2 '>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => router.push(`/admin/all-users/user-sms-configuration/${client.id}`)}
                                        className="p-2 rounded-xl w-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 group bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20"
                                    >
                                        {/* Icon container */}
                                        <div className="p-1.5 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 group-hover:from-blue-600 group-hover:to-purple-700 transition-all">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>

                                        {/* Text */}
                                        <span className="text-blue-700 dark:text-blue-300 font-semibold group-hover:text-blue-800 dark:group-hover:text-blue-200">
                                            SMS Configuration
                                        </span>

                                        {/* Arrow indicator */}
                                        <svg className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>

                        </div>




                        {/* Action menu */}
                        <div className="dropdown dropdown-end">

                            <ul className="dropdown-content menu p-2 shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl w-40 z-50 backdrop-blur-sm">
                                <li>
                                    <button
                                        onClick={() => onView(client)}
                                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => onEdit(client)}
                                        className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                </li>
                                {client.status !== 'active' && (
                                    <li>
                                        <button
                                            onClick={() => onStatusChange(client, 'active')}
                                            className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                                        >
                                            <UserCheck className="w-4 h-4" />
                                            Activate Account
                                        </button>
                                    </li>
                                )}
                                {client.status !== 'pending' && (
                                    <li>
                                        <button
                                            onClick={() => onStatusChange(client, 'pending')}
                                            className="flex items-center gap-2 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            Set as Pending
                                        </button>
                                    </li>
                                )}
                                {client.status !== 'inactive' && (
                                    <li>
                                        <button
                                            onClick={() => onStatusChange(client, 'inactive')}
                                            className="flex items-center gap-2 text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                                        >
                                            <UserX className="w-4 h-4" />
                                            Deactivate
                                        </button>
                                    </li>
                                )}

                                <li className="divider my-1 !h-px bg-gray-200 dark:bg-gray-800" />

                                <li>
                                    <button
                                        onClick={() => onDelete(client)}
                                        className="flex items-center gap-2 text-rose-700 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete Client
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Client info grid */}
                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="space-y-3">
                            {/* Email */}
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors">
                                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {client.email}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors">
                                <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {client.mobileNo}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Age */}
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors">
                                <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Age</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {client.age} years
                                    </p>
                                </div>
                            </div>

                            {/* NID */}
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors">
                                <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                    <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">NID/Passport</p>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {client.nidOrPassportNo}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                        {/* Join date */}
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                                <Calendar className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Joined</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(client.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2">
                            {/* View NID button */}
                            {client.nidPhoto.frontSide && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.open(client.nidPhoto.frontSide, '_blank')}
                                    className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 transition-all flex items-center gap-1.5"
                                >
                                    <Shield className="w-3.5 h-3.5" />
                                    View NID
                                </motion.button>
                            )}

                            {/* Profile button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onView(client)}
                                className="px-3 py-1.5 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 text-white text-xs font-semibold hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-500/15 transition-all flex items-center gap-1.5"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                View Profile
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Hover shine effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-white/20 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
        </motion.div>
    );
}




//! Main Content Component
export default function ClientsContent() {
    const { theme, } = useTheme();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [showClientModal, setShowClientModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, ] = useState(10);

    // Use Redux RTK Query hooks
    const {
        data: clientsData,
        isLoading,
        isError,
        refetch
    } = useGetAllClientsQuery({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: statusFilter,
        role: 'client'
    });

    const [deleteClient, { isLoading: isDeleting }] = useDeleteClientMutation();
    const [updateClientStatus] = useUpdateClientStatusMutation();

    // Extract data from API response
    const clients = clientsData?.data || [];
    const pagination = clientsData?.pagination || {
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        itemsPerPage: 10
    };

    // Handle search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1); // Reset to first page on search
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, statusFilter]);

    // Handle actions
    const handleViewClient = (client: Client) => {
        setSelectedClient(client);
        setShowClientModal(true);
    };

    const handleEditClient = (client: Client) => {
        toast.success(`Editing ${client.fullName}`);
        // Implement edit functionality
    };

    const handleDeleteClient = (client: Client) => {
        setClientToDelete(client);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!clientToDelete) return;

        try {
            await deleteClient(clientToDelete.id).unwrap();
            toast.success(`${clientToDelete.fullName} deleted successfully`);
            setShowDeleteModal(false);
            setClientToDelete(null);
        } catch (err) {
            console.error('Error deleting client:', err);
            toast.error(err?.data?.message || 'Failed to delete client');
        }
    };

    const handleStatusChange = async (client: Client, status: 'active' | 'pending' | 'inactive') => {
        try {
            await updateClientStatus({ id: client.id, status }).unwrap();
            toast.success(`Client status updated to ${status}`);
            // RTK Query will automatically refetch and update the cache
        } catch (err) {
            console.error('Error updating status:', err);
            toast.error(err?.data?.message || 'Failed to update status');
        }
    };

    // Pagination controls
    const PaginationControls = () => (
        <div className="flex items-center justify-between mt-6">
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                {pagination.totalItems} clients
            </div>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setCurrentPage(1)}
                    disabled={pagination.currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                        } disabled:opacity-30`}
                >
                    <ChevronsLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setCurrentPage(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                        } disabled:opacity-30`}
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-1">
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
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-3 py-1 rounded-lg transition-colors ${pagination.currentPage === pageNum
                                    ? 'bg-blue-500 text-white'
                                    : theme === 'dark'
                                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => setCurrentPage(pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= pagination.totalPages}
                    className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                        } disabled:opacity-30`}
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setCurrentPage(pagination.totalPages)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                        ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                        } disabled:opacity-30`}
                >
                    <ChevronsRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );

    // Stats
    const stats = {
        total: pagination.totalItems,
        active: clients.filter((c: Client) => c.status === 'active').length,
        pending: clients.filter((c: Client) => c.status === 'pending').length,
        inactive: clients.filter((c: Client) => c.status === 'inactive').length
    };

    const statsColors = [
        { label: 'Total Clients', value: stats.total, color: 'from-blue-500 to-cyan-500', icon: User },
        { label: 'Active', value: stats.active, color: 'from-emerald-500 to-green-500', icon: CheckCircle },
        { label: 'Pending', value: stats.pending, color: 'from-amber-500 to-yellow-500', icon: AlertCircle },
        { label: 'Inactive', value: stats.inactive, color: 'from-rose-500 to-pink-500', icon: XCircle }
    ];

    return (
        <div className={`min-h-screen ${theme === 'dark'
            ? 'bg-linear-to-br from-gray-900 via-black to-gray-900'
            : 'bg-linear-to-br from-gray-50 via-white to-gray-100'
            } p-6`}>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: theme === 'dark'
                        ? 'bg-gray-800 text-white border border-gray-700'
                        : 'bg-white text-gray-900 border border-gray-200',
                }}
            />

            {/* Header */}
            <div className="mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between"
                >
                    <div>
                        <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Client Management
                        </h1>
                        <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            Manage and monitor all client accounts in your system
                        </p>
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
                >
                    {statsColors.map((stat, index) => (
                        <div
                            key={index}
                            className={`${theme === 'dark'
                                ? 'bg-linear-to-br from-gray-900/50 to-gray-800/30 border-gray-800 hover:border-gray-700'
                                : 'bg-white/50 border-gray-200 hover:border-gray-300'
                                } backdrop-blur-sm border rounded-2xl p-6 transition-all`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {stat.label}
                                    </p>
                                    <p className={`text-3xl font-bold mt-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`w-14 h-14 rounded-full bg-linear-to-br ${stat.color} flex items-center justify-center`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <div className={`flex flex-col md:flex-row gap-4 items-center justify-between ${theme === 'dark'
                    ? 'bg-gray-900/30 border-gray-800'
                    : 'bg-white/50 border-gray-200'
                    } backdrop-blur-sm border rounded-2xl p-6`}>
                    <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input
                                type="text"
                                placeholder="Search clients by name, email, phone, or NID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-4 py-3 ${theme === 'dark'
                                    ? 'bg-gray-900 border-gray-800 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20'
                                    } border rounded-xl focus:outline-none focus:ring-1`}
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className={`pl-10 pr-4 py-3 ${theme === 'dark'
                                        ? 'bg-gray-900 border-gray-800 text-white focus:border-blue-500 focus:ring-blue-500/20'
                                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-400 focus:ring-blue-400/20'
                                        } border rounded-xl appearance-none focus:outline-none focus:ring-1 min-w-[180px]`}
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => refetch()}
                            disabled={isLoading}
                            className={`p-3 rounded-xl transition-colors ${theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                                } disabled:opacity-50`}
                            title="Refresh"
                        >
                            <RefreshCw className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            className={`p-3 rounded-xl transition-colors ${theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-700'
                                : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            title="Export"
                        >
                            <Download className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Loading clients...</p>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            Failed to load clients. Please try again.
                        </p>
                        <button
                            onClick={() => refetch()}
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : clients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <User className="w-16 h-16 text-gray-400 mb-4" />
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>No clients found</p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 text-blue-500 hover:text-blue-600"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : <LayoutGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {clients.map((client: Client) => (
                                <ClientCard
                                    key={client.id}
                                    client={client}
                                    onView={handleViewClient}
                                    onEdit={handleEditClient}
                                    onDelete={handleDeleteClient}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </LayoutGroup>}

                {clients.length > 0 && <PaginationControls />}
            </motion.div>

            {/* Client Detail Modal */}
            <AnimatePresence>
                {showClientModal && selectedClient && (
                    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`${theme === 'dark'
                                ? 'bg-linear-to-br from-gray-900 to-gray-800 border-gray-800'
                                : 'bg-white border-gray-200'
                                } border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        Client Details
                                    </h2>
                                    <button
                                        onClick={() => setShowClientModal(false)}
                                        className={`p-2 rounded-lg transition-colors ${theme === 'dark'
                                            ? 'hover:bg-gray-800'
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <XCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    {/* Profile Header */}
                                    <div className="flex items-center space-x-6">
                                        <div className="relative">
                                            <div className={`w-24 h-24 rounded-full ${theme === 'dark'
                                                ? 'bg-linear-to-br from-blue-500 to-purple-600'
                                                : 'bg-linear-to-br from-blue-400 to-blue-600'
                                                } flex items-center justify-center`}>
                                                {selectedClient.photo ? (
                                                    <img
                                                        src={selectedClient.photo}
                                                        alt={selectedClient.fullName}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <User className="w-12 h-12 text-white" />
                                                )}
                                            </div>
                                            <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 ${theme === 'dark' ? 'border-gray-900' : 'border-white'} ${selectedClient.status === 'active' ? 'bg-emerald-500' :
                                                selectedClient.status === 'pending' ? 'bg-amber-500' :
                                                    'bg-rose-500'
                                                }`} />
                                        </div>
                                        <div>
                                            <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {selectedClient.fullName}
                                            </h3>
                                            <div className="flex items-center space-x-3 mt-2">
                                                <span className={`px-4 py-1 rounded-full text-sm font-medium ${selectedClient.status === 'active' ? theme === 'dark'
                                                    ? 'bg-emerald-500/10 text-emerald-400'
                                                    : 'bg-emerald-100 text-emerald-700' :
                                                    selectedClient.status === 'pending' ? theme === 'dark'
                                                        ? 'bg-amber-500/10 text-amber-400'
                                                        : 'bg-amber-100 text-amber-700' :
                                                        theme === 'dark'
                                                            ? 'bg-rose-500/10 text-rose-400'
                                                            : 'bg-rose-100 text-rose-700'
                                                    }`}>
                                                    {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                                                </span>
                                                <span className={`px-4 py-1 rounded-full text-sm font-medium ${theme === 'dark'
                                                    ? 'bg-gray-800 text-gray-300'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    ID: #{selectedClient.id.toString().padStart(4, '0')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[
                                            { label: 'Email', value: selectedClient.email, icon: Mail },
                                            { label: 'Phone', value: selectedClient.mobileNo, icon: Phone },
                                            { label: 'Age', value: selectedClient.age.toString(), icon: Calendar },
                                            { label: 'Gender', value: selectedClient.sex, icon: User },
                                            { label: 'NID/Passport', value: selectedClient.nidOrPassportNo, icon: Shield },
                                            { label: 'Role', value: selectedClient.role, icon: UserCheck }
                                        ].map((item) => (
                                            <div key={item.label} className={`${theme === 'dark'
                                                ? 'bg-gray-900/50'
                                                : 'bg-gray-50'
                                                } rounded-xl p-4`}>
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <item.icon className="w-5 h-5 text-blue-500" />
                                                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{item.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* NID Photos */}
                                    {selectedClient.nidPhoto.frontSide && (
                                        <div>
                                            <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                                                NID Photos
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {selectedClient.nidPhoto.frontSide && (
                                                    <div>
                                                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            Front Side
                                                        </p>
                                                        <img
                                                            src={selectedClient.nidPhoto.frontSide}
                                                            alt="NID Front"
                                                            className="w-full h-48 object-cover rounded-lg"
                                                        />
                                                    </div>
                                                )}
                                                {selectedClient.nidPhoto.backSide && (
                                                    <div>
                                                        <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                            Back Side
                                                        </p>
                                                        <img
                                                            src={selectedClient.nidPhoto.backSide}
                                                            alt="NID Back"
                                                            className="w-full h-48 object-cover rounded-lg"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Dates */}
                                    <div className={`grid grid-cols-2 gap-6 pt-6 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                                        <div>
                                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Created</p>
                                            <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                                                {new Date(selectedClient.createdAt).toLocaleDateString()} at{' '}
                                                {new Date(selectedClient.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated</p>
                                            <p className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                                                {new Date(selectedClient.updatedAt).toLocaleDateString()} at{' '}
                                                {new Date(selectedClient.updatedAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={`flex items-center justify-end space-x-4 mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                                    <button
                                        onClick={() => setShowClientModal(false)}
                                        className={`px-6 py-2 border ${theme === 'dark'
                                            ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                                            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                                            } rounded-lg transition-colors`}
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleEditClient(selectedClient);
                                            setShowClientModal(false);
                                        }}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Edit Client
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && clientToDelete && (
                    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`${theme === 'dark'
                                ? 'bg-linear-to-br from-gray-900 to-gray-800 border-gray-800'
                                : 'bg-white border-gray-200'
                                } border rounded-2xl max-w-md w-full p-8`}
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 bg-rose-100 dark:bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Trash2 className="w-10 h-10 text-rose-500" />
                                </div>

                                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                                    Delete Client
                                </h3>
                                <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Are you sure you want to delete <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                        {clientToDelete.fullName}
                                    </span>? This action cannot be undone.
                                </p>

                                <div className="flex items-center justify-center space-x-4">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        disabled={isDeleting}
                                        className={`px-6 py-2 border ${theme === 'dark'
                                            ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                                            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                                            } rounded-lg transition-colors disabled:opacity-50`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        disabled={isDeleting}
                                        className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete Client'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}