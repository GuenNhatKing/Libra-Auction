"use client";

import { useEffect, useMemo, useState } from "react";
import { Auction } from "@/types/auction/auction";
import { AuctionFilters, AuctionFilterFields, defaultAuctionFilters } from "./auction_filters";
import { AuctionItem } from "./auction_item";
import { useRouter } from "next/navigation";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";

const PAGE_SIZE = 20;

interface AuctionListProps {
  auctions: Auction[];
}

export const AuctionList = ({ auctions }: AuctionListProps) => {
  const [filters, setFilters] = useState<AuctionFilterFields>(defaultAuctionFilters);
  const [currentPage, setCurrentPage] = useState(0);

  const categoryOptions = useMemo(
    () => Array.from(new Set(auctions.map((a) => a.category_name).filter(Boolean))).sort(),
    [auctions]
  );

  const filteredAuctions = useMemo(() => {
    const search = filters.searchName.trim().toLowerCase();
    const minPrice = filters.minStartingPrice ? Number(filters.minStartingPrice) : null;
    const maxPrice = filters.maxStartingPrice ? Number(filters.maxStartingPrice) : null;
    const startFrom = filters.startTimeFrom ? new Date(filters.startTimeFrom).getTime() : null;
    const startTo = filters.startTimeTo ? new Date(filters.startTimeTo).getTime() : null;

    return auctions.filter((auction) => {
      const auctionStartTime = new Date(auction.start_time).getTime();

      return (
        (!search || auction.product_name.toLowerCase().includes(search)) &&
        (filters.approvalStatus === "ALL" || auction.approval_status === filters.approvalStatus) &&
        (filters.auctionStatus === "ALL" || auction.auction_status === filters.auctionStatus) &&
        (filters.category === "ALL" || auction.category_name === filters.category) &&
        (minPrice === null || auction.starting_price >= minPrice) &&
        (maxPrice === null || auction.starting_price <= maxPrice) &&
        (startFrom === null || auctionStartTime >= startFrom) &&
        (startTo === null || auctionStartTime <= startTo)
      );
    });
  }, [auctions, filters]);

  useEffect(() => { setCurrentPage(0); }, [filters]);

  const totalPages = Math.ceil(filteredAuctions.length / PAGE_SIZE);
  const paginatedAuctions = useMemo(
    () => filteredAuctions.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE),
    [filteredAuctions, currentPage],
  );

  const router = useRouter();

  return (
    <div className="w-full space-y-4">
      <AuctionFilters
        filters={filters}
        onChange={setFilters}
        categoryOptions={categoryOptions}
      />

      <div className="flex items-center justify-between">
        <PaginationInfo currentPage={currentPage} pageSize={PAGE_SIZE} totalElements={filteredAuctions.length} />
        <button
          type="button"
          onClick={() => router.push("/seller-dashboard/auctions/new-auction")}
          className="rounded-lg bg-(--primary-color) px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          + Create Auction
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {paginatedAuctions.length > 0 ? (
          paginatedAuctions.map((auction) => (
            <AuctionItem
              key={auction.auction_id}
              auction={auction}
              onView={(id) => router.push(`/seller-dashboard/auctions/${id}`)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <svg className="w-12 h-12 text-gray-300 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-400 font-medium">No matching data found</p>
          </div>
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
