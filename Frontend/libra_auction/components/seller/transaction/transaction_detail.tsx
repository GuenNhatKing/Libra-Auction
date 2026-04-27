import { TransactionDetailData } from "@/types/transaction_detail_type";

const statusConfig = {
  SUCCESS: { label: "Thành công", color: "bg-green-100 text-green-700 border-green-200" },
  PENDING: { label: "Chờ xử lý", color: "bg-amber-100 text-amber-700 border-amber-200" },
  FAILED: { label: "Thất bại", color: "bg-red-100 text-red-700 border-red-200" },
};

export const TransactionDetail = ({ data }: { data: TransactionDetailData }) => {
  const status = statusConfig[data.status];

  return (
    <div className="bg-white rounded-2xl border border-[#AFD3E2] shadow-sm overflow-hidden max-w-2xl mx-auto">
      {/* Header của Card */}
      <div className="bg-[#F6F1F1] px-6 py-4 border-b border-[#AFD3E2] flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-[#146C94] uppercase tracking-widest">Chi tiết giao dịch</p>
          <h2 className="text-sm font-mono font-bold text-gray-700 mt-0.5">#{data.id}</h2>
        </div>
        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* Danh sách Key-Value */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <DetailItem label="Phiên đấu giá" value={data.auction_name} isLink href={`/auctions/${data.auction_id}`} />
          <DetailItem label="Người tham gia" value={data.participant_name} />
          <DetailItem 
            label="Số tiền thanh toán" 
            value={`${data.amount.toLocaleString()} VND`} 
            highlight 
          />
          <DetailItem label="Thời gian giao dịch" value={data.created_at} />
          <DetailItem label="Phương thức" value={data.payment_method} />
          
          {data.transaction_hash && (
            <div className="pt-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Mã tham chiếu hệ thống</p>
              <p className="text-xs font-mono bg-gray-50 p-2 rounded border border-gray-100 break-all text-gray-500">
                {data.transaction_hash}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer chứa hướng dẫn hoặc ghi chú */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-[11px] text-gray-400 italic text-center">
          Giao dịch này được ghi lại tự động bởi hệ thống thanh toán.
        </p>
      </div>
    </div>
  );
};

// Component con hỗ trợ hiển thị Key-Value
const DetailItem = ({ label, value, highlight, isLink, href }: any) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{label}</span>
    {isLink ? (
      <a href={href} className="text-sm font-semibold text-[#19A7CE] hover:underline transition-all">
        {value}
      </a>
    ) : (
      <span className={`text-sm font-semibold ${highlight ? 'text-[#146C94] text-base' : 'text-gray-800'}`}>
        {value}
      </span>
    )}
  </div>
);