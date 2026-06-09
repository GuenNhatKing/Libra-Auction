"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserInfo } from "@/types/user_info";
import Image from "next/image";

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);
const AuctionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <g>
      <path d="M13.1 1A10.927 10.927 0 0 0 2.566 9.223l-.732-1.107a1 1 0 1 0-1.668 1.1l2.2 3.334a1.084 1.084 0 0 0 .634.425 1.024 1.024 0 0 0 .756-.145l3.3-2.223a1 1 0 1 0-1.115-1.659L4.44 9.96A8.909 8.909 0 1 1 13.1 21a8.892 8.892 0 0 1-7.281-3.822 1 1 0 1 0-1.64 1.143A10.881 10.881 0 0 0 24 12 10.963 10.963 0 0 0 13.1 1z" />
      <path d="M13 5.95a1 1 0 0 0-1 1V12a1.04 1.04 0 0 0 .293.707l3 3.027a1.013 1.013 0 0 0 1.414.007 1 1 0 0 0 .006-1.414L14 11.589V6.95a1 1 0 0 0-1-1z" />
    </g>
  </svg>
);
const WalletIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const allMenuItems: Array<{ path: string; label: string; icon: React.ReactNode }> = [
  { path: "/profile", label: "Profile", icon: <UserIcon /> },
  { path: "/profile/edit", label: "Edit profile", icon: <EditIcon /> },
  { path: "/profile/auction-history", label: "Auction history", icon: <AuctionIcon /> },
  { path: "/profile/wallet", label: "Wallet & transactions", icon: <WalletIcon /> },
  { path: "/profile/email-verify", label: "Email verification", icon: <MailIcon /> },
  { path: "/profile/change-password", label: "Change password", icon: <LockIcon /> },
];

export function ProfileSidebar({ user }: { user: UserInfo }) {
  const pathname = usePathname();
  const menuItems = user.hasPasswordAccount
    ? allMenuItems
    : allMenuItems.filter((item) => item.path !== "/profile/change-password");

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="relative mb-5">
          <Image
            src={user.avatarUrl || "/default-avatar.png"}
            alt={user.fullName}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover border-4 border-[var(--accent-color)] shadow-md"
          />
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-[3px] border-white rounded-full"></div>
        </div>

        <h2 className="text-2xl font-extrabold text-[var(--secondary-color)]">
          {user.fullName}
        </h2>
        <p className="text-base text-gray-500 mt-1">{user.email}</p>

        <span className="mt-4 px-4 py-1.5 bg-[var(--accent-color)]/30 text-[var(--secondary-color)] text-sm font-bold rounded-full">
          {user.role?.name || "Member"}
        </span>
      </div>

      <nav className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              scroll={false}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-xl font-medium text-base transition-colors ${
                isActive
                  ? "bg-[var(--accent-color)]/30 text-[var(--primary-color)]"
                  : "text-gray-600 hover:bg-[var(--accent-color)]/20 hover:text-[var(--primary-color)]"
              }`}
            >
              <span
                className={`w-6 flex justify-center ${
                  isActive ? "text-[var(--primary-color)]" : "text-gray-400"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
