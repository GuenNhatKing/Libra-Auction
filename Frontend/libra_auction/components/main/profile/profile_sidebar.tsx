import Link from 'next/link';
import { UserInfo } from "@/types/user_info";

// Inline SVG icons
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>;
const AuctionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 4 4"/><path d="M13 7 14.5 8.5"/><path d="M9 11 10.5 12.5"/><path d="m5 15 4 4"/><path d="m3 21 3-3"/><path d="M20.5 7.5 18 5l-5 5 2.5 2.5z"/></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;

export const ProfileSidebar = ({ user }: { user: UserInfo }) => {
  const menuItems = [
    { title: "Profile", icon: <UserIcon />, href: "/profile" },
    { title: "Edit profile", icon: <EditIcon />, href: "/profile/edit" },
    { title: "Auction history", icon: <AuctionIcon />, href: "/profile/auctions" },
    { title: "Wallet & transactions", icon: <WalletIcon />, href: "/profile/transactions" },
  ];

  return (
    <div className="flex flex-col gap-8"> {/* Tăng khoảng cách giữa 2 khối lên gap-8 */}
      
      {/* 1. Khối Mini Profile Card */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="relative mb-5">
          <img 
            src={user.avatarUrl} 
            alt={user.fullName} 
            // Tăng kích thước ảnh từ w-24 lên w-32
            className="w-32 h-32 rounded-full object-cover border-4 border-[var(--accent-color)] shadow-md"
          />
          {/* Tăng kích thước chấm xanh online */}
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-[3px] border-white rounded-full"></div>
        </div>
        
        {/* Tăng font chữ Tên lên text-2xl */}
        <h2 className="text-2xl font-extrabold text-[var(--secondary-color)]">{user.fullName}</h2>
        <p className="text-base text-gray-500 mt-1">{user.email}</p>
        
        <span className="mt-4 px-4 py-1.5 bg-[var(--accent-color)]/30 text-[var(--secondary-color)] text-sm font-bold rounded-full">
          {user.roles[0]?.name || "Member"}
        </span>
      </div>

      {/* 2. Khối Navigation Menu */}
      <nav className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <Link 
            key={idx} 
            href={item.href}
            // Tăng padding (px-5 py-3.5) và text-base để menu bự hơn
            className="flex items-center gap-4 px-5 py-3.5 rounded-xl text-gray-600 font-medium text-base hover:bg-[var(--accent-color)]/20 hover:text-[var(--primary-color)] transition-colors"
          >
            <span className="text-gray-400 w-6 flex justify-center">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};