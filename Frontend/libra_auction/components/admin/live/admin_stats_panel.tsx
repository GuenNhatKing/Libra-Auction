"use client";

import { CurrencyFormat } from "@/utils/currency_format";

interface AdminStatsPanelProps {
  currentPrice: number;
  endTimeMs: number;
  viewerCount: number;
  participantCount: number;
  totalBids: number;
  highestBidder: string;
  auctionStatus: string;
}

export default function AdminStatsPanel({
  currentPrice,
  viewerCount,
  participantCount,
  totalBids,
  highestBidder,
}: AdminStatsPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-[#AFD3E2] p-6 shadow-sm">
      <h3 className="text-lg font-bold text-[#146C94] mb-4">
        Thống kê thời gian thực
      </h3>

      {/* Current Price */}
      <div className="bg-gradient-to-r from-[#146C94] to-[#19A7CE] rounded-xl p-4 mb-4">
        <p className="text-xs text-white/70 uppercase tracking-wider">
          Giá hiện tại
        </p>
        <p className="text-3xl font-bold text-white mt-1">
          {CurrencyFormat(currentPrice)}
        </p>
      </div>

      {/* Highest Bidder */}
      <div className="bg-[#F6FBFC] rounded-lg p-3 mb-4 border border-[#AFD3E2]/50">
        <p className="text-xs text-[#5A7184] uppercase">
          Người giữ giá cao nhất
        </p>
        <p className="text-sm font-bold text-[#146C94] mt-1 truncate">
          {highestBidder}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#F6FBFC] rounded-lg p-3 text-center border border-[#AFD3E2]/50">
          <p className="text-2xl font-bold text-[#146C94]">{viewerCount}</p>
          <p className="text-xs text-[#5A7184]">Người xem</p>
        </div>
        <div className="bg-[#F6FBFC] rounded-lg p-3 text-center border border-[#AFD3E2]/50">
          <p className="text-2xl font-bold text-[#146C94]">
            {participantCount}
          </p>
          <p className="text-xs text-[#5A7184]">Người tham gia</p>
        </div>
        <div className="bg-[#F6FBFC] rounded-lg p-3 text-center border border-[#AFD3E2]/50 col-span-2">
          <p className="text-2xl font-bold text-[#19A7CE]">{totalBids}</p>
          <p className="text-xs text-[#5A7184]">Tổng số bid</p>
        </div>
      </div>
    </div>
  );
}
