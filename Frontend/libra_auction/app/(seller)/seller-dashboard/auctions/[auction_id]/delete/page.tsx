"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuctionDeleteConfirm } from "@/components/seller/auction/auction_delete_confirm";
import { Auction } from "@/types/auction/auction";
import { fetchAuction } from "@/services/fetch_auction";
import { deleteAuction } from "@/services/delete_auction";

export default function DeleteAuctionPage() {
  const params = useParams();
  const router = useRouter();

  const auctionId = params.auction_id as string;

  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH DETAIL AUCTION
  // =========================
  useEffect(() => {
    const loadAuction = async () => {
      if (!auctionId) return;

      try {
        setLoading(true);
        if (!params.auction_id || Array.isArray(params.auction_id)) {
          return;
        }

        const data = await fetchAuction(params.auction_id);

        setAuction(data);
      } catch (error) {
        console.error("Fetch auction error:", error);
        router.push("/seller-dashboard/auctions");
      } finally {
        setLoading(false);
      }
    };

    loadAuction();
  }, [auctionId, router, params.auction_id]);

  // =========================
  // DELETE AUCTION
  // =========================
  const handleDelete = async () => {
    try {
      if (!params.auction_id || Array.isArray(params.auction_id)) {
        return;
      }

      await deleteAuction(params.auction_id);

      router.push("/seller-dashboard/auctions");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the auction.");
    }
  };

  // =========================
  // UI STATES
  // =========================
  if (loading) {
    return (
      <div className="p-10 text-center italic text-gray-400">
        Checking data...
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="p-10 text-center text-red-500">
        Auction not found
      </div>
    );
  }

  // =========================
  // RENDER
  // =========================
  return (
    <div className="min-h-screen bg-(--background-color) flex items-center justify-center p-6">
      <AuctionDeleteConfirm
        auction={auction}
        onDelete={handleDelete}
        onCancel={() => router.back()}
      />
    </div>
  );
}