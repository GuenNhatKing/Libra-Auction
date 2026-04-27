"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TransactionDetail } from "@/components/seller/transaction/transaction_detail";
import { TransactionDetailData } from "@/types/transaction_detail_type";

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [transaction, setTransaction] = useState<TransactionDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchTransaction = async () => {
    //   try {
    //     const res = await fetch(`/api/transactions/${params.id}`);
    //     if (!res.ok) throw new Error("Transaction not found");
    //     const data = await res.json();
    //     setTransaction(data);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // if (params.id) fetchTransaction();
        // Mock data tạm thời
    setTimeout(() => {
        setTransaction({
          id: "1",
          auction_id: "1",
          auction_name: "Phiên đấu giá mẫu",
          participant_name: "Người tham gia mẫu",
          amount: 1000000,
          created_at: "2023-10-01 10:00:00",
          payment_method: "Chuyển khoản",
          transaction_hash: "0x1234567890abcdef",
          status: "SUCCESS"
        });
        setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F1F1]">
      <div className="text-[#146C94] font-bold animate-pulse">Đang tải biên lai...</div>
    </div>
  );

  if (!transaction) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F1F1]">
      <div className="text-red-500 font-bold">Không tìm thấy thông tin giao dịch.</div>
    </div>
  );

  return (
    <main className="p-6 md:p-10 bg-[#F6F1F1]">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-[#146C94] hover:text-[#19A7CE] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg>
          Quay lại danh sách
        </button>

        <TransactionDetail data={transaction} />
        
        <div className="mt-8 flex justify-center gap-4">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#AFD3E2] text-[#146C94] rounded-xl text-xs font-bold hover:bg-gray-50 transition-all shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/></svg>
            In hóa đơn
          </button>
        </div>
      </div>
    </main>
  );
}