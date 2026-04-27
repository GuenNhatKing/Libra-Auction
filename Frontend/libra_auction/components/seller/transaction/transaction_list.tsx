"use client";

import { Transaction } from "@/types/transaction_type";
import { TransactionItem } from "./transaction_item";
import { useRouter } from "next/navigation";

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const router = useRouter();

  return (
    <div className="w-full space-y-3">
      {/* Header đơn giản cho desktop */}
      <div className="hidden md:flex px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
        <div className="flex-1 flex gap-6">
          <div className="min-w-[140px]">Thông tin mã</div>
          <div className="flex-1">Người tham gia</div>
          <div className="hidden lg:block min-w-[150px]">Ngày thực hiện</div>
        </div>
        <div className="min-w-[200px] text-right pr-28">Số tiền</div>
      </div>

      {/* List items */}
      <div className="flex flex-col gap-2">
        {transactions.length > 0 ? (
          transactions.map((item) => (
            <TransactionItem
              key={item.id}
              transaction={item}
              onView={() => router.push(`/seller-dashboard/transactions/${item.id}`)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">Chưa có giao dịch nào được thực hiện.</p>
          </div>
        )}
      </div>
    </div>
  );
};