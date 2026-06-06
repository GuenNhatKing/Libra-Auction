'use client';

import { UserInfo } from "@/types/user_info";
import Image from "next/image";

// Helper format status display
const formatStatus = (status: string): string => {
    return status
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// Helper get status color
const getStatusColor = (status: string, type: 'email' | 'account'): string => {
    if (type === 'email') {
        return status === 'VERIFIED' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50';
    }
    return status === 'ACTIVE' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50';
};

export default function ProfileContent({ user }: { user: UserInfo }) {
    // Console log response data
    console.log('[ProfileContent] User data:', user);

    const detailItem = (label: string, value: string, isStatus: boolean = false, statusType?: 'email' | 'account') => (
        <div className="py-4 border-b border-gray-50 last:border-0">
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            {isStatus && statusType ? (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(value, statusType)}`}>
                    {formatStatus(value)}
                </span>
            ) : (
                <p className="font-medium text-[--foreground]">
                    {value || <span className="text-gray-300 italic">Chưa cập nhật</span>}
                </p>
            )}
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="border-b border-gray-100 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-[var(--secondary-color)]">My Profile</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Manage security settings and personal profile information
                </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                {/* User Header with Avatar */}
                <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-100">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        {user.avatarUrl ? (
                            <Image
                                src={user.avatarUrl}
                                alt={user.fullName || 'User avatar'}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[--primary-color]/10 text-[--primary-color] text-2xl font-bold">
                                {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {user.fullName || 'Chưa cập nhật tên'}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-[--primary-color]/10 text-[--primary-color]">
                                {user.role?.name || 'User'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <h3 className="text-lg font-bold mb-4 border-l-4 border-[--primary-color] pl-4">
                    Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                    {detailItem("Full Name", user.fullName)}
                    {detailItem("Email", user.email)}
                    {detailItem("Phone Number", user.phoneNumber)}
                    {detailItem("Identity Number", user.identityNumber)}
                    {detailItem("Email Status", user.emailStatus, true, 'email')}
                    {detailItem("Account Status", user.accountStatus, true, 'account')}
                </div>

                {/* Note about missing fields */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 italic">
                        * Username, Created Date và các thông tin khác sẽ được cập nhật khi Backend hỗ trợ.
                    </p>
                </div>
            </div>

            {/* Role & Permissions Card */}
            {user.role && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 border-l-4 border-[--primary-color] pl-4">
                        Role & Permissions
                    </h3>
                    <div className="space-y-3">
                        <div className="py-3 border-b border-gray-50">
                            <p className="text-sm text-gray-400 mb-1">Role Name</p>
                            <p className="font-medium text-[--foreground]">{user.role.name}</p>
                        </div>
                        {user.role.description && (
                            <div className="py-3 border-b border-gray-50">
                                <p className="text-sm text-gray-400 mb-1">Description</p>
                                <p className="font-medium text-[--foreground]">{user.role.description}</p>
                            </div>
                        )}
                        {user.role.permissions && user.role.permissions.length > 0 && (
                            <div className="py-3">
                                <p className="text-sm text-gray-400 mb-2">Permissions</p>
                                <div className="flex flex-wrap gap-2">
                                    {user.role.permissions.map((perm, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                                            title={perm.description}
                                        >
                                            {perm.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}