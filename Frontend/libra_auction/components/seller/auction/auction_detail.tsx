"use client";

import Link from "next/link";
import { AuctionDetailData } from "@/types/auction_type";
import { QuestionList } from "./question_list";

interface AuctionDetailProps {
  data: AuctionDetailData & {
    auction_status?: "UPCOMING" | "LIVE" | "ENDED" | "CANCELLED";
  };
}

export const AuctionDetail = ({ data }: AuctionDetailProps) => {
  const isLive = data.auction_status === "LIVE";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* 🔙 Back button */}
      <div>
        <Link
          href="/seller-dashboard/auctions"
          className="text-sm text-gray-500 hover:text-gray-800 font-medium"
        >
          ← Quay lại danh sách
        </Link>
      </div>

      {/* Thông tin phiên đấu giá */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          {/* LEFT */}
          <div className="space-y-4 flex-1">
            <div>
              <span className="text-xs font-semibold text-[var(--primary-color)] uppercase tracking-wide">
                Chi tiết phiên
              </span>

              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {data.auction_name}
              </h1>

              {/* trạng thái */}
              <p className="text-sm mt-1 font-medium">
                Trạng thái:{" "}
                <span
                  className={`${
                    isLive
                      ? "text-green-600"
                      : data.auction_status === "UPCOMING"
                      ? "text-blue-500"
                      : data.auction_status === "ENDED"
                      ? "text-gray-500"
                      : "text-red-500"
                  }`}
                >
                  {data.auction_status}
                </span>
              </p>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
              {data.description}
            </p>

            <div className="flex gap-8 border-t border-gray-50 pt-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  Giá khởi điểm
                </p>
                <p className="text-lg font-bold text-[var(--secondary-color)]">
                  {data.starting_price.toLocaleString()} VND
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold">
                  Mã phiên
                </p>
                <p className="text-sm font-mono mt-1 font-medium">
                  #{data.id}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="md:w-64 space-y-3">
            {isLive ? (
              <Link
                href={`/seller-dashboard/auctions/${data.id}/live`}
                className="block text-center w-full bg-green-600 text-white font-semibold py-2.5 rounded-xl hover:bg-green-700 transition-all active:scale-95 shadow"
              >
                Xem trực tiếp
              </Link>
            ) : (
              <>
                <Link
                  href={`/seller-dashboard/auctions/${data.id}/edit`}
                  className="block text-center w-full bg-[var(--primary-color)] text-white font-semibold py-2.5 rounded-xl hover:bg-[var(--secondary-color)] transition-all active:scale-95 shadow"
                >
                  Chỉnh sửa
                </Link>

                <Link
                  href={`/seller-dashboard/auctions/${data.id}/delete`}
                  className="block text-center w-full bg-red-50 text-red-600 font-semibold py-2.5 rounded-xl border border-red-200 hover:bg-red-100 transition-all"
                >
                  Xoá phiên
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Question & Answer */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <QuestionList questions={data.questions} />
      </div>
    </div>
  );
};