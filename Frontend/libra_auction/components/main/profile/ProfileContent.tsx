"use client";

import { useEffect, useState } from "react";
import { UserInfo } from "@/types/user_info";
import { fetchUserInfo } from "@/services/fetch_user_info";
import Image from "next/image";

interface ProfileContentProps {
  userId: string;
  initialUser?: UserInfo;
  refreshKey?: number;
}

export function ProfileContent({
  userId,
  initialUser,
  refreshKey = 0,
}: ProfileContentProps) {
  const [profile, setProfile] = useState<UserInfo | null>(initialUser ?? null);
  const [loading, setLoading] = useState(!initialUser);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const userData = await fetchUserInfo(userId);
        setProfile(userData);
      } catch (err: unknown) {
        console.error("Error fetching profile:", err);
        const message =
          err instanceof Error ? err.message : "An error occurred while loading profile";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadProfile();
    }
  }, [userId, refreshKey]);

  // Loading State
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-32 h-4 bg-gray-200 rounded"></div>
                <div className="flex-1 h-4 bg-gray-100 rounded ml-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  // Empty State
  if (!profile) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <p className="text-gray-500 text-center">No profile data found</p>
      </div>
    );
  }

  // Helper function for status badge
  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "active" || statusLower === "verified") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          {status}
        </span>
      );
    }
    if (statusLower === "pending") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        {status}
      </span>
    );
  };

  // Profile fields configuration
  const profileFields = [
    { label: "Full Name", value: profile?.fullName },
    { label: "ID", value: profile?.id },
    ...(profile?.hasPasswordAccount && profile?.username
      ? [{ label: "Username", value: profile.username }]
      : []),
    { label: "Email", value: profile?.email },
    { label: "Phone Number", value: profile?.phoneNumber || "—" },
    { label: "Identity Number", value: profile?.identityNumber || "—" },
    {
      label: "Email Status",
      value: profile?.emailStatus,
      isStatus: true,
    },
    {
      label: "Account Status",
      value: profile?.accountStatus,
      isStatus: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[var(--secondary-color)]">
          Profile Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Your personal account details
        </p>
      </div>

      {/* Avatar Section */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            <Image
              src={profile.avatarUrl || '/default-avatar.png'}
              alt={profile.fullName}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {profile?.fullName}
            </h3>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <div className="mt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {profile?.role?.name || "User"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="px-6 py-4">
        <dl className="divide-y divide-gray-100">
          {profileFields.map((field, index) => (
            <div
              key={index}
              className="py-3 sm:grid sm:grid-cols-3 sm:gap-4"
            >
              <dt className="text-sm font-medium text-gray-500">
                {field.label}
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {field.isStatus
                  ? getStatusBadge(field.value)
                  : field.value || "—"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}