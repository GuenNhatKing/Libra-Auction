"use client";

import { Transaction } from "@/types/transaction_type";

interface TransactionItemProps {
  transaction: Transaction;
  onView: (id: string) => void;
}

export const TransactionItem = ({ transaction, onView }: TransactionItemProps) => {
  // Mapping màu sắc badge trạng thái
  const statusConfig = {
    SUCCESS: "text-green-600 bg-green-50 border-green-100",
    PENDING: "text-amber-600 bg-amber-50 border-amber-100",
    FAILED: "text-red-600 bg-red-50 border-red-100",
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-[var(--accent-color)] hover:shadow-sm transition-all flex items-center justify-between group">
      <div className="flex items-center gap-4">
        {/* Icon đại diện cho Giao dịch (giống style Product) */}
        <div className="h-12 w-12 bg-[var(--background-color)] rounded-xl flex items-center justify-center text-[var(--secondary-color)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-800 text-base">#{transaction.id}</h3>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${statusConfig[transaction.status]}`}>
              {transaction.status}
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="text-sm font-medium text-[var(--secondary-color)]">
              {transaction.participant_name}
            </span>
            <span className="text-sm text-gray-500">
              Số tiền: <b className="text-gray-900">+{transaction.amount.toLocaleString()} VND</b>
            </span>
            <span className="hidden md:block text-xs text-gray-400">
              {transaction.created_at}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {/* View Action - Đồng bộ style icon button của ProductItem */}
        <button 
          onClick={() => onView(transaction.id)}
          className="p-2 text-gray-400 hover:text-[var(--primary-color)] hover:bg-blue-50 rounded-lg transition-colors"
          title="Xem chi tiết"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>
    </div>
  );
};