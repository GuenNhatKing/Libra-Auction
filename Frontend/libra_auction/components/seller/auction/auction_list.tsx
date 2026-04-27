"use client";

import { useState } from "react";
import { Auction } from "@/types/auction_type";
import { AuctionSearchBar } from "./auction_search_bar";
import { AuctionItem } from "./auction_item";
import { useRouter } from "next/navigation";

interface AuctionListProps {
  auctions: Auction[];
}

export const AuctionList = ({ auctions }: AuctionListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAuctions = auctions.filter((a) =>
    a.auction_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const router = useRouter();

  return (
    <div className="w-full">
      <AuctionSearchBar 
        onSearch={setSearchTerm} 
        onAddClick={() => router.push("/seller-dashboard/auctions/new-auction")} 
      />

      <div className="flex flex-col gap-3">
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction) => (
            <AuctionItem
              key={auction.id}
              auction={auction}
              onView={(id) => router.push(`/seller-dashboard/auctions/${id}`)}
              onEdit={(id) => router.push(`/seller-dashboard/auctions/${id}/edit`)}
              onDelete={(id) => router.push(`/seller-dashboard/auctions/${id}/delete`)}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400">Không tìm thấy phiên đấu giá nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};