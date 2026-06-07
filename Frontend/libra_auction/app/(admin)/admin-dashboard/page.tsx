'use client';

import { useEffect, useState } from "react";
import { getErrorMessage } from "@/lib/app_error";
import { fetchPendingUsers } from "@/services/fetch_pending_users";
import { fetchPendingAuctions } from "@/services/fetch_pending_auctions";
import { fetchLiveAuctions } from "@/services/fetch_live_auctions";

interface PendingData {
  pendingUsers: number;
  pendingAuctions: number;
  liveAuctions: number;
}

function StatCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: number | string;
  valueClassName: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#AFD3E2] p-5 shadow-sm shadow-[#AFD3E2]/20">
      <p className="text-xs font-semibold text-[#5A7184] uppercase">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${valueClassName}`}>{value}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [pendingData, setPendingData] = useState<PendingData>({
    pendingUsers: 0,
    pendingAuctions: 0,
    liveAuctions: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersResponse, auctionsResponse, liveAuctionsResponse] = await Promise.all([
          fetchPendingUsers(0, 1),
          fetchPendingAuctions(0, 1),
          fetchLiveAuctions(),
        ]);

        setPendingData({
          pendingUsers: usersResponse.totalElements,
          pendingAuctions: auctionsResponse.totalElements,
          liveAuctions: liveAuctionsResponse.length,
        });
      } catch (error) {
        setError(getErrorMessage(error, "Failed to fetch pending dashboard data."));
      } finally {
        setLoading(false);
      }
    };

    fetchPendingData();
  }, []);

  return (
    <div className="space-y-8">
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      ) : null}
      <div className="rounded-2xl border border-[#AFD3E2] bg-linear-to-r from-white to-[#F6FBFC] p-6 shadow-sm shadow-[#AFD3E2]/20">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5A7184]">Admin Overview</p>
            <h2 className="mt-1 text-2xl font-bold text-[#146C94]">Auction moderation and live operations</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#5A7184]">
              Follow pending approvals and the current live auction queue from one place.
            </p>
          </div>

        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <StatCard
            label="Pending Users"
            value={pendingData.pendingUsers}
            valueClassName="text-orange-600"
          />
          <StatCard
            label="Pending Auctions"
            value={pendingData.pendingAuctions}
            valueClassName="text-orange-600"
          />
          <StatCard
            label="Live Auctions"
            value={pendingData.liveAuctions}
            valueClassName="text-emerald-600"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#AFD3E2] p-6 shadow-sm shadow-[#AFD3E2]/20">
        <h3 className="text-lg font-bold text-[#146C94] mb-2">Admin Overview</h3>
        <p className="text-sm text-[#5A7184]">
          Use the dashboard cards above to monitor approval queues and the current live auction workload.
        </p>
      </div>
    </div>
  );
}