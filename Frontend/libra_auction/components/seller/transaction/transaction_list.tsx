"use client";

import { Transaction } from "@/types/transaction_type";
import { TransactionItem } from "./transaction_item";
import { useRouter } from "next/navigation";

interface TransactionListProps {
  transactions: Transaction[];
  detailsHrefPrefix?: string;
}

export const TransactionList = ({ transactions, detailsHrefPrefix }: TransactionListProps) => {
  const router = useRouter();

  return (
    <div className="w-full space-y-3">
      {/* Simple desktop header */}
      <div className="hidden md:flex px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
        <div className="flex-1 flex gap-6">
          <div className="min-w-[140px]">ID info</div>
          <div className="flex-1">Participant</div>
          <div className="hidden lg:block min-w-[150px]">Date</div>
        </div>
        <div className="min-w-[200px] text-right pr-28">Amount</div>
      </div>

      {/* List items */}
      <div className="flex flex-col gap-2">
        {transactions.length > 0 ? (
          transactions.map((item) => (
            <TransactionItem
              key={item.id}
              transaction={item}
              onView={detailsHrefPrefix ? () => router.push(`${detailsHrefPrefix}/${item.id}`) : undefined}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">No transactions have been made yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};