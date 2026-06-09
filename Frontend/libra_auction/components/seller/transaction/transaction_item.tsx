"use client";

import { Transaction } from "@/types/transaction_type";

interface TransactionItemProps {
  transaction: Transaction;
  onView?: (id: string) => void;
}

export const TransactionItem = ({ transaction, onView }: TransactionItemProps) => {
  const statusConfig: Record<Transaction["status"], { label: string; color: string }> = {
    SUCCESS: { label: "Success", color: "text-green-600 bg-green-50 border-green-100" },
    PROCESSING: { label: "Processing", color: "text-amber-600 bg-amber-50 border-amber-100" },
    REFUNDED: { label: "Refunded", color: "text-blue-600 bg-blue-50 border-blue-100" },
    CANCELLED: { label: "Cancelled", color: "text-gray-600 bg-gray-50 border-gray-100" },
    FAILED: { label: "Failed", color: "text-red-600 bg-red-50 border-red-100" },
  };

  const status = statusConfig[transaction.status];

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-(--accent-color) hover:shadow-sm transition-all flex items-center justify-between group">
      <div className="flex items-center gap-4">
        {/* Transaction icon */}
        <div className="h-12 w-12 bg-(--background-color) rounded-xl flex items-center justify-center text-(--secondary-color)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-gray-800 text-base">#{transaction.id}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-lg border ${status.color}`}>
              {status.label}
            </span>

            <span className="text-xs font-medium text-(--secondary-color) bg-(--accent-color) bg-opacity-30 px-2 py-0.5 rounded-lg">
              {transaction.transaction_type === "DEPOSIT" ? "Deposit" : "Payment"}
            </span>

            <span className="text-sm text-gray-500">
              Amount: <b className={transaction.direction === "OUTGOING" ? "text-red-600" : "text-gray-900"}>{transaction.direction === "OUTGOING" ? "-" : "+"}{transaction.amount.toLocaleString()} VND</b>
            </span>

            <span className="hidden md:block text-sm text-gray-500 ml-1">
              {transaction.created_at}
            </span>
          </div>
        </div>
      </div>

      {onView && (
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(transaction.id)}
            className="p-2 text-gray-400 hover:text-(--primary-color) hover:bg-blue-50 rounded-lg transition-colors"
            title="View details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
