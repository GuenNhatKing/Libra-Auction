"use client";

import { CurrencyFormat } from "@/utils/currency_format";

export interface BidEntry {
  bidderName: string;
  amount: number;
  time: string;
  status: "SUCCESS" | "ERROR" | "WINNER";
  bidderId?: string;
}

interface BidHistoryProps {
  bids: BidEntry[];
  maxHeight?: string;
  currentUserId?: string | null;
}

export default function BidHistory({
  bids,
  maxHeight = "400px",
  currentUserId = null,
}: BidHistoryProps) {
  
  if (!bids || bids.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-[#5A7184]">No bids yet</p>
      </div>
    );
  }

  return (
    <div
      className="overflow-auto space-y-2 pr-1 h-full"
      style={maxHeight === "100%" ? { height: "100%" } : { maxHeight }}
    >
      {bids.map((bid, idx) => {
        const isMyBid = currentUserId && bid.bidderId && bid.bidderId === currentUserId;

        return (
          <div
            key={idx}
            className={`flex items-center justify-between p-3 rounded-lg border transition ${
              isMyBid
                ? "bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60 shadow-sm shadow-amber-200/40"
                : bid.status === "WINNER"
                ? "bg-yellow-50 border-yellow-200"
                : bid.status === "ERROR"
                ? "bg-red-50 border-red-200"
                : "bg-[#F6FBFC] border-[#AFD3E2]/50"
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold truncate ${isMyBid ? "text-amber-800" : "text-[#146C94]"}`}>
                  {bid.bidderName} {isMyBid && <span className="font-normal text-xs text-amber-600">(You)</span>}
                </span>
                {bid.status === "WINNER" && (
                  <span className="px-1.5 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">
                    WINNER
                  </span>
                )}
                {bid.status === "ERROR" && (
                  <span className="px-1.5 py-0.5 bg-red-400 text-white text-xs font-bold rounded">
                    ERROR
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5A7184] mt-0.5">{bid.time}</p>
            </div>
            <div className="text-right shrink-0 ml-4">
              <p
                className={`text-sm font-bold ${
                  bid.status === "ERROR"
                    ? "text-red-500 line-through"
                    : bid.status === "WINNER"
                    ? "text-yellow-700"
                    : isMyBid
                    ? "text-amber-700"
                    : "text-[#19A7CE]"
                }`}
              >
                {CurrencyFormat(bid.amount)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}