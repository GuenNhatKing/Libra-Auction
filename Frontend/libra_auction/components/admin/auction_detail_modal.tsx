'use client';

import { useState } from "react";
import Image from "next/image";
import AdminModal from "./admin_modal";

interface AuctionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auctionData: {
    productName: string;
    description: string;
    startTime: string;
    endTime: string;
    images: string[];
    startingPrice: number;
    currentPrice: number;
    category: string;
    status: string;
    auctionStatus?: string;
    totalBids: number;
    totalParticipants: number;
    failureReason?: string;
    completedAt?: string;
  };
}

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  APPROVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
};

const auctionStatusColors: Record<string, string> = {
  UPCOMING: "bg-blue-100 text-blue-800 border-blue-200",
  LIVE: "bg-green-100 text-green-800 border-green-200",
  PAUSED: "bg-yellow-100 text-yellow-800 border-yellow-200",
  ENDED: "bg-gray-100 text-gray-700 border-gray-200",
  COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  FAILED: "bg-rose-100 text-rose-800 border-rose-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

export default function AuctionDetailModal({
  isOpen,
  onClose,
  auctionData,
}: AuctionDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const statusClass =
    statusColors[auctionData.status] ?? "bg-gray-100 text-gray-700 border-gray-200";
  const auctionStatusClass =
    auctionStatusColors[auctionData.auctionStatus ?? ""] ??
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <AdminModal
      isOpen={isOpen}
      onClose={onClose}
      title="Auction Details"
      size="large"
      footer={
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#146C94] text-white rounded-lg font-semibold hover:bg-[#19A7CE] transition-colors"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Image Gallery */}
        <div className="lg:w-1/2 flex flex-col gap-3">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src={auctionData.images[activeImage] ?? "/placeholder-image.jpg"}
              alt={auctionData.productName}
              fill
              className="object-cover"
              priority
            />
          </div>
          {auctionData.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {auctionData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeImage
                      ? "border-[#19A7CE] ring-2 ring-[#19A7CE]/30"
                      : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          {/* Title + Badges */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {auctionData.productName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{auctionData.category}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusClass}`}
              >
                {auctionData.status}
              </span>
              {auctionData.auctionStatus && (
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${auctionStatusClass}`}
                >
                  {auctionData.auctionStatus}
                </span>
              )}
            </div>
          </div>

          {/* Price Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-[#146C94]/5 to-[#19A7CE]/10 rounded-xl p-4 border border-[#19A7CE]/20">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Starting Price
              </p>
              <p className="text-lg font-bold text-[#146C94] mt-1">
                {formatPrice(auctionData.startingPrice)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-xl p-4 border border-emerald-200/60">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Price
              </p>
              <p className="text-lg font-bold text-emerald-700 mt-1">
                {formatPrice(auctionData.currentPrice)}
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex gap-3">
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-800">{auctionData.totalBids}</p>
              <p className="text-xs text-gray-500 mt-0.5">Bids</p>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-800">
                {auctionData.totalParticipants}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Participants</p>
            </div>
          </div>

          {/* Time Range */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {auctionData.startTime}
                </p>
              </div>
              <div className="text-gray-300 text-lg">→</div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End
                </p>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {auctionData.endTime}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Description
            </p>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 max-h-32 overflow-y-auto">
              {auctionData.description}
            </p>
          </div>

          {/* Completion / Failure */}
          {auctionData.auctionStatus === "COMPLETED" && auctionData.completedAt && (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                  Completed
                </p>
                <p className="text-sm font-semibold text-emerald-800">
                  {auctionData.completedAt}
                </p>
              </div>
            </div>
          )}
          {auctionData.auctionStatus === "FAILED" && (
            <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl p-3.5">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-rose-600 uppercase tracking-wider">
                  Failure Reason
                </p>
                <p className="text-sm font-semibold text-rose-800">
                  {auctionData.failureReason || "No reason provided"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminModal>
  );
}
