'use client';
import { Auction } from "@/types/auction/auction";
import { AuctionStatus } from "@/types/status";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const auctionStatusConfig: Record<AuctionStatus, { label: string; classes: string }> = {
    UPCOMING: { label: "Upcoming", classes: "bg-emerald-500/90 text-white" },
    LIVE: { label: "Live", classes: "bg-red-500/90 text-white" },
    PAUSED: { label: "Paused", classes: "bg-yellow-500/90 text-white" },
    ENDED: { label: "Ended", classes: "bg-gray-600/90 text-white" },
    CANCELLED: { label: "Cancelled", classes: "bg-red-500/90 text-white" },
    COMPLETED: { label: "Completed", classes: "bg-emerald-600/90 text-white" },
    FAILED: { label: "Failed", classes: "bg-rose-500/90 text-white" },
};

function normalizeSpringIsoDate(value: string) {
    return value.replace(/\.(\d{3})\d+(Z|[+-]\d{2}:?\d{2})$/, ".$1$2");
}

function toTimestamp(value: Date | string | number | undefined) {
    if (value instanceof Date) return value.getTime();
    if (typeof value === "number") return value;
    if (typeof value === "string") return new Date(normalizeSpringIsoDate(value)).getTime();
    return NaN;
}

export default function AuctionCard({ auctionCard }: { auctionCard: Auction }) {
    const router = useRouter();
    const [now, setNow] = useState(() => Date.now());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const status = auctionStatusConfig[auctionCard.auction_status] ?? { label: 'Unknown', classes: 'bg-gray-50 text-gray-500 border-gray-100' };

    useEffect(() => {
        const timerId = window.setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => window.clearInterval(timerId);
    }, []);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatCountdown = (targetTime: number, currentTime: number) => {
        const remainingMs = targetTime - currentTime;
        const safeRemainingMs = Math.max(0, remainingMs);
        const totalSeconds = Math.floor(safeRemainingMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return [hours, minutes, seconds]
            .map((value) => String(value).padStart(2, "0"))
            .join(":");
    };

    const explicitEndTime = toTimestamp(auctionCard.end_time);
    const startTime = toTimestamp(auctionCard.start_time);
    const auctionEndTime = Number.isNaN(explicitEndTime)
        ? startTime + auctionCard.duration * 1000
        : explicitEndTime;

    // Auto-transition to LIVE when startTime has passed but server hasn't updated yet
    // Only use Date.now() after hydration to avoid server/client mismatch
    const isLive = mounted
        ? (auctionCard.auction_status === "LIVE" || now >= startTime)
        : auctionCard.auction_status === "LIVE";
    const countdownLabel = isLive ? "Ends in" : "Starts in";
    const countdownValue = mounted
        ? (isLive
            ? formatCountdown(auctionEndTime, now)
            : formatCountdown(startTime, now))
        : "--:--:--";
    const primaryStatLabel = isLive ? "Current price" : "Starting price";
    const primaryStatValue = isLive
        ? formatCurrency(auctionCard.current_price)
        : formatCurrency(auctionCard.starting_price);
    const secondaryStatLabel = "Participants";
    const secondaryStatValue = auctionCard.total_participants.toLocaleString("vi-VN");
    const bidStatValue = auctionCard.total_bids.toLocaleString("vi-VN");
    const actionLabel = isLive ? "Join now" : "View details";

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:border-[#19A7CE] hover:shadow-[0_0_15px_rgba(25,167,206,0.3)] transition-all duration-300 flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                    src={auctionCard.images[0] || "/placeholder.jpg"}
                    alt={auctionCard.product_name}
                    fill
                    className="object-cover"
                />

                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                    <span className="px-2.5 py-1 bg-black/70 text-white text-[10px] font-bold uppercase rounded-lg">
                        {auctionCard.category_name}
                    </span>
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg ${status.classes}`}>
                        {status.label}
                    </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-white/95 py-2 px-3 rounded-xl shadow flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`rounded-full h-2 w-2 ${isLive ? "bg-red-500" : "bg-emerald-500"}`}></span>
                        <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">{countdownLabel}</span>
                    </div>
                    <span className={`text-xs font-mono font-bold ${isLive ? "text-red-600" : "text-emerald-600"}`}>{countdownValue}</span>
                </div>
            </div>

            <div className="p-4 flex flex-col grow">
                {/* Changed from line-clamp-2 to truncate block to force 1 line and add tooltip title on hover */}
                <h3 
                    className="font-bold text-gray-800 truncate block leading-tight mb-3"
                    title={auctionCard.product_name}
                >
                    {auctionCard.product_name}
                </h3>

                <div className="mt-auto pt-3 border-t border-gray-50">
                    <div className="flex justify-between items-end mb-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1.5">{primaryStatLabel}</span>
                            <span className="text-xl font-black text-[#19A7CE] leading-none tracking-tight">
                                {primaryStatValue}
                            </span>
                        </div>
                        <div className="min-w-16 text-right">
                            <span className="block text-[9px] text-gray-400 uppercase leading-none mb-1.5">{secondaryStatLabel}</span>
                            <span className="text-xs font-bold text-gray-600 leading-none">
                                {secondaryStatValue}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center gap-2 shrink-0 rounded-xl bg-gray-50 px-3.5 py-2.5 border border-gray-100 min-w-14 h-[38px]">
                            <svg className="h-4 w-4 text-gray-800 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                                <path d="M487.5 146.5c-20.9-44.3-54-81.5-95.7-107.6-58-36.2-126.7-47.7-193.3-32.3C131.9 21.9 75.2 62.3 39 120.3 2.7 178.3-8.8 246.9 6.6 313.6 22 380.2 62.4 436.9 120.3 473.1c40.8 25.5 87.6 39 135.5 39h3.1c47.7-.6 94.1-14.4 134.3-39.8 11.7-7.4 15.1-22.8 7.7-34.5s-22.8-15.1-34.5-7.7c-32.3 20.5-69.7 31.6-108.1 32.1-39.4.5-77.9-10.4-111.5-31.3-46.7-29.2-79.2-74.8-91.5-128.4S52.2 193.7 81.4 147C141.6 50.7 269 21.3 365.3 81.5c33.6 21 60.2 50.9 77 86.5 16.4 34.7 22.8 73.2 18.5 111.2-1.5 13.7 8.3 26.1 22.1 27.6 13.7 1.5 26.1-8.3 27.6-22.1 5.3-47.3-2.7-95.1-23-138.2z" />
                                <path d="M338.7 169.2 218.1 289.8l-44.7-44.7c-9.8-9.8-25.6-9.8-35.4 0s-9.8 25.6 0 35.4l62.4 62.4c4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3L374 204.6c9.8-9.8 9.8-25.6 0-35.4-9.8-9.7-25.6-9.7-35.3 0z" />
                            </svg>

                            <span
                                className="text-xs font-extrabold text-gray-800 truncate max-w-[45px] block leading-none"
                                title={bidStatValue}
                            >
                                {bidStatValue}
                            </span>
                        </div>

                        <button className="flex-1 bg-[#19A7CE] hover:bg-[#146C94] text-white text-xs font-bold py-2.5 h-[38px] rounded-xl shadow-sm shadow-[#19A7CE]/20 transition-all duration-200 active:scale-[0.98]"
                            onClick={() => router.push(`/auctions/${auctionCard.category_id}/${auctionCard.auction_id}`)}>
                            {actionLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}