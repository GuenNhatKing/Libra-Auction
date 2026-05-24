// Local SVG icons
const AuctionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 4 4"/><path d="M13 7 14.5 8.5"/><path d="M9 11 10.5 12.5"/><path d="m5 15 4 4"/><path d="m3 21 3-3"/><path d="M20.5 7.5 18 5l-5 5 2.5 2.5z"/></svg>
);

const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
);

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
);

const UserEditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
);

export const ActionGrid = () => {
  const actions = [
    { 
      title: "Auction history", 
      icon: <AuctionIcon />, 
      desc: "Review auctions you have joined", 
      color: "text-blue-600 bg-blue-50",
      hover: "hover:border-blue-200"
    },
    { 
      title: "Edit profile", 
      icon: <UserEditIcon />, 
      desc: "Update your personal details", 
      color: "text-indigo-600 bg-indigo-50",
      hover: "hover:border-indigo-200"
    },
    { 
      title: "Wallet & transactions", 
      icon: <WalletIcon />, 
      desc: "Manage balance and deposits", 
      color: "text-emerald-600 bg-emerald-50",
      hover: "hover:border-emerald-200"
    },
    { 
      title: "Activity history", 
      icon: <HistoryIcon />, 
      desc: "Login and security log", 
      color: "text-amber-600 bg-amber-50",
      hover: "hover:border-amber-200"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {actions.map((action, index) => (
        <button
          key={index}
          className={`group flex flex-col p-5 bg-white border border-gray-100 rounded-2xl transition-all duration-200 shadow-sm active:scale-[0.98] text-left ${action.hover}`}
        >
          <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-transform group-hover:scale-110 ${action.color}`}>
            {action.icon}
          </div>
          <div>
            <h3 className="font-bold text-[--foreground] text-base group-hover:text-[--primary-color] transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1 leading-snug">
              {action.desc}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};