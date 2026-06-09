"use client";

import { TransactionFilterFields, defaultTransactionFilters } from "@/types/transaction_type";

interface TransactionFiltersProps {
  filters: TransactionFilterFields;
  onChange: (filters: TransactionFilterFields) => void;
}

export const TransactionFilters = ({ filters, onChange }: TransactionFiltersProps) => {
  const update = (partial: Partial<TransactionFilterFields>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Transaction Filters</h3>
          <p className="text-sm text-gray-500">Filter by ID, participant, status, type, direction and amount.</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(defaultTransactionFilters)}
          className="rounded-lg bg-(--background-color) px-4 py-2 text-sm font-semibold text-(--primary-color) hover:bg-(--accent-color) transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Transaction ID / Description
          <input
            type="search"
            value={filters.searchTerm}
            onChange={(e) => update({ searchTerm: e.target.value })}
            placeholder="Search by ID or description"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Participant
          <input
            type="search"
            value={filters.participantName}
            onChange={(e) => update({ participantName: e.target.value })}
            placeholder="Search by participant"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Status
          <select
            value={filters.status}
            onChange={(e) => update({ status: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          >
            <option value="ALL">All statuses</option>
            <option value="SUCCESS">Success</option>
            <option value="PROCESSING">Processing</option>
            <option value="REFUNDED">Refunded</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="FAILED">Failed</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Transaction Type
          <select
            value={filters.transactionType}
            onChange={(e) => update({ transactionType: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          >
            <option value="ALL">All types</option>
            <option value="DEPOSIT">Deposit</option>
            <option value="PAYMENT">Payment</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Direction
          <select
            value={filters.direction}
            onChange={(e) => update({ direction: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          >
            <option value="ALL">All directions</option>
            <option value="INCOMING">Incoming</option>
            <option value="OUTGOING">Outgoing</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Min Amount
          <input
            type="number"
            min="0"
            value={filters.minAmount}
            onChange={(e) => update({ minAmount: e.target.value })}
            placeholder="From"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Max Amount
          <input
            type="number"
            min="0"
            value={filters.maxAmount}
            onChange={(e) => update({ maxAmount: e.target.value })}
            placeholder="To"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>
      </div>
    </div>
  );
};
