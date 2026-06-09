"use client";

import { ApprovalStatus, AuctionStatus } from "@/types/status";

export type AuctionFilterFields = {
  searchName: string;
  approvalStatus: string;
  auctionStatus: string;
  category: string;
  minStartingPrice: string;
  maxStartingPrice: string;
  startTimeFrom: string;
  startTimeTo: string;
};

export const defaultAuctionFilters: AuctionFilterFields = {
  searchName: "",
  approvalStatus: "ALL",
  auctionStatus: "ALL",
  category: "ALL",
  minStartingPrice: "",
  maxStartingPrice: "",
  startTimeFrom: "",
  startTimeTo: "",
};

interface AuctionFiltersProps {
  filters: AuctionFilterFields;
  onChange: (filters: AuctionFilterFields) => void;
  categoryOptions: string[];
}

export const AuctionFilters = ({ filters, onChange, categoryOptions }: AuctionFiltersProps) => {
  const update = (partial: Partial<AuctionFilterFields>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Auction Filters</h3>
          <p className="text-sm text-gray-500">Filter by name, status, category, price and start time.</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(defaultAuctionFilters)}
          className="rounded-lg bg-(--background-color) px-4 py-2 text-sm font-semibold text-(--primary-color) hover:bg-(--accent-color) transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Product name
          <input
            type="search"
            value={filters.searchName}
            onChange={(e) => update({ searchName: e.target.value })}
            placeholder="Search by name"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Approval
          <select
            value={filters.approvalStatus}
            onChange={(e) => update({ approvalStatus: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          >
            <option value="ALL">All approval statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Auction status
          <select
            value={filters.auctionStatus}
            onChange={(e) => update({ auctionStatus: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          >
            <option value="ALL">All auction statuses</option>
            <option value="UPCOMING">Not started</option>
            <option value="LIVE">In progress</option>
            <option value="PAUSED">Paused</option>
            <option value="ENDED">Ended</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Category
          <select
            value={filters.category}
            onChange={(e) => update({ category: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          >
            <option value="ALL">All categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Min starting price
          <input
            type="number"
            min="0"
            value={filters.minStartingPrice}
            onChange={(e) => update({ minStartingPrice: e.target.value })}
            placeholder="From"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Max starting price
          <input
            type="number"
            min="0"
            value={filters.maxStartingPrice}
            onChange={(e) => update({ maxStartingPrice: e.target.value })}
            placeholder="To"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Start time from
          <input
            type="datetime-local"
            value={filters.startTimeFrom}
            onChange={(e) => update({ startTimeFrom: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Start time to
          <input
            type="datetime-local"
            value={filters.startTimeTo}
            onChange={(e) => update({ startTimeTo: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>
      </div>
    </div>
  );
};
