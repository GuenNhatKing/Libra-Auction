"use client";

import { useMemo, useState } from "react";
import { Transaction, TransactionFilterFields, defaultTransactionFilters } from "@/types/transaction_type";
import { TransactionFilters } from "./transaction_filters";
import { TransactionItem } from "./transaction_item";
import { useRouter } from "next/navigation";

interface TransactionListProps {
  transactions: Transaction[];
  detailsHrefPrefix?: string;
}

export const TransactionList = ({ transactions, detailsHrefPrefix }: TransactionListProps) => {
  const [filters, setFilters] = useState<TransactionFilterFields>(defaultTransactionFilters);
  const router = useRouter();

  const filteredTransactions = useMemo(() => {
    const search = filters.searchTerm.trim().toLowerCase();
    const participant = filters.participantName.trim().toLowerCase();
    const minAmount = filters.minAmount ? Number(filters.minAmount) : null;
    const maxAmount = filters.maxAmount ? Number(filters.maxAmount) : null;

    return transactions.filter((t) => {
      const matchesSearch =
        !search ||
        t.id.toLowerCase().includes(search) ||
        (t.description && t.description.toLowerCase().includes(search));
      const matchesParticipant = !participant || t.participant_name.toLowerCase().includes(participant);
      const matchesStatus = filters.status === "ALL" || t.status === filters.status;
      const matchesType = filters.transactionType === "ALL" || t.transaction_type === filters.transactionType;
      const matchesDirection = filters.direction === "ALL" || t.direction === filters.direction;
      const matchesMinAmount = minAmount === null || t.amount >= minAmount;
      const matchesMaxAmount = maxAmount === null || t.amount <= maxAmount;

      return matchesSearch && matchesParticipant && matchesStatus && matchesType && matchesDirection && matchesMinAmount && matchesMaxAmount;
    });
  }, [transactions, filters]);

  return (
    <div className="space-y-4">
      <TransactionFilters filters={filters} onChange={setFilters} />

      <div className="grid grid-cols-1 gap-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((item) => (
            <TransactionItem
              key={item.id}
              transaction={item}
              onView={detailsHrefPrefix ? () => router.push(`${detailsHrefPrefix}/${item.id}`) : undefined}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <svg className="w-12 h-12 text-gray-300 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p className="text-gray-400 font-medium">No matching data found</p>
          </div>
        )}
      </div>
    </div>
  );
};
