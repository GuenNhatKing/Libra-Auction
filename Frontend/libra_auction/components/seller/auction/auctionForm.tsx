"use client";
import { createAuction } from "@/services/create_auction";
import { NewAuction } from "@/types/auction/new-auction";
import { Product } from "@/types/product/product";
import { useState } from "react";

type AuctionFormData = {
  productId: string;
  thoiGianBatDau: string;
  thoiLuong: number;
  giaKhoiDiem: number;
  buocGiaNhoNhat: number;
  tienCoc: number;
};

export default function AuctionForm({ products }: { products: Product[] }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<AuctionFormData>({
    productId: "",
    thoiGianBatDau: "",
    thoiLuong: 60,
    giaKhoiDiem: 0,
    buocGiaNhoNhat: 0,
    tienCoc: 0
  });

  const handleChange = <K extends keyof AuctionFormData>(field: K, value: AuctionFormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const auction: NewAuction = {
        taiSanId: formData.productId,
        thoiGianBatDau: new Date(formData.thoiGianBatDau).toISOString(),
        thoiLuong: Number(formData.thoiLuong),
        giaKhoiDiem: Number(formData.giaKhoiDiem),
        buocGiaNhoNhat: Number(formData.buocGiaNhoNhat),
        tienCoc: Number(formData.tienCoc)
      };

      const res = await createAuction(auction);
      if (res) {
        alert("Auction created successfully!");
        window.location.href = "/seller-dashboard/auctions";
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create auction!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-[#AFD3E2] space-y-8 shadow-sm">
      {/* STEP HEADER */}
      <div className="flex border-b border-[#AFD3E2]">
        <div className={`flex-1 p-4 text-center font-bold ${step === 1 ? 'bg-[#19A7CE] text-white' : 'bg-gray-50'}`}>
          1. Select Product
        </div>
        <div className={`flex-1 p-4 text-center font-bold ${step === 2 ? 'bg-[#19A7CE] text-white' : 'bg-gray-50'}`}>
          2. Configure Auction
        </div>
      </div>

      <div className="p-6">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            {products.map((p) => (
              <div
                key={p.product_id}
                onClick={() => handleChange("productId", p.product_id)}
                className={`p-4 border rounded cursor-pointer ${formData.productId === p.product_id
                  ? "border-[#146C94] bg-[#F6F1F1]"
                  : "border-gray-200"
                  }`}
              >
                <div className="flex flex-col">
                  <p className="font-bold text-[#146C94]">{p.product_name}</p>
                  <p className="text-xs text-gray-400">ID: {p.product_id}</p>
                  {"quantity" in p && (
                    <p className="text-xs text-gray-500">Quantity: {p.quantity}</p>
                  )}
                </div>
              </div>
            ))}
            <button
              disabled={!formData.productId}
              onClick={() => setStep(2)}
              className="w-full bg-[#146C94] text-white py-3 rounded disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Start time</label>
                <input
                  type="datetime-local"
                  onChange={(e) => handleChange("thoiGianBatDau", e.target.value)}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Duration (minutes)</label>
                <input
                  type="number"
                  value={formData.thoiLuong}
                  onChange={(e) => handleChange("thoiLuong", Number(e.target.value))}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Starting price</label>
                <input
                  type="number"
                  onChange={(e) => handleChange("giaKhoiDiem", Number(e.target.value))}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Minimum bid increment</label>
                <input
                  type="number"
                  onChange={(e) => handleChange("buocGiaNhoNhat", Number(e.target.value))}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Deposit</label>
                <input
                  type="number"
                  placeholder="0"
                  onChange={(e) => handleChange("tienCoc", Number(e.target.value))}
                  className="border p-2 rounded"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border py-3 rounded"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-[#146C94] text-white py-3 rounded"
              >
                Create auction
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}