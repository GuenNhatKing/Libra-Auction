"use client";
import { createAuction } from "@/services/create_auction";
import { sendEmailVerificationAction } from "@/lib/auth_actions";
import { getErrorMessage } from "@/lib/app_error";
import { NewAuction } from "@/types/auction/new-auction";
import { Product } from "@/types/product/product";
import { useState } from "react";

type AuctionFormData = {
  productId: string;
  startTime: string;
  duration: number;
  startingPrice: number;
  minimumBidIncrement: number;
  depositAmount: number;
};

export default function AuctionForm({ products }: { products: Product[] }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailVerificationNeeded, setEmailVerificationNeeded] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  const [formData, setFormData] = useState<AuctionFormData>({
    productId: "",
    startTime: "",
    duration: 3600,
    startingPrice: 1000,
    minimumBidIncrement: 100,
    depositAmount: 0
  });

  const handleChange = <K extends keyof AuctionFormData>(field: K, value: AuctionFormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendEmailVerification = async () => {
    try {
      // Get user email from session/cookie - for now we'll need to get it from somewhere
      // This is a simplified version - in production you'd get the email from the authenticated user
      const email = prompt("Please enter your email address for verification:");
      if (!email) return;

      const result = await sendEmailVerificationAction(email);
      if (result.success) {
        setEmailVerificationSent(true);
        setError(null);
      } else {
        setError(result.error || "Failed to send verification email");
      }
    } catch (err) {
      setError(getErrorMessage(err, "Failed to send verification email"));
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    try {
      if (!formData.startTime) {
        setError("Please select a start time.");
        return;
      }
      if (formData.startingPrice <= 0) {
        setError("Starting price must be greater than 0.");
        return;
      }
      if (formData.minimumBidIncrement <= 0) {
        setError("Minimum bid increment must be greater than 0.");
        return;
      }

      const auction: NewAuction = {
        productId: formData.productId,
        startTime: new Date(formData.startTime).toISOString(),
        duration: Number(formData.duration),
        startingPrice: Number(formData.startingPrice),
        minimumBidIncrement: Number(formData.minimumBidIncrement),
        depositAmount: Number(formData.depositAmount)
      };

      await createAuction(auction);
      setSuccess("Auction created successfully!");
      window.location.href = "/seller-dashboard/auctions";
    } catch (err) {
      const errorMessage = getErrorMessage(err, "Failed to create auction!");
      setError(errorMessage);
      if (errorMessage.toLowerCase().includes("email must be verified")) {
        setEmailVerificationNeeded(true);
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-[#AFD3E2] space-y-8 shadow-sm">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <p>{error}</p>
          {emailVerificationNeeded && !emailVerificationSent && (
            <button
              onClick={handleSendEmailVerification}
              className="mt-2 text-blue-600 underline hover:text-blue-800"
            >
              Send verification email
            </button>
          )}
          {emailVerificationSent && (
            <p className="mt-2 text-green-600">
              Verification email sent! Please check your inbox and verify your email.
            </p>
          )}
        </div>
      ) : null}
      {success ? (
        <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">{success}</p>
      ) : null}
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
            {products.filter(p => p.status !== "SOLD").length === 0 && (
              <p className="text-gray-500 text-center py-8">Không có sản phẩm khả dụng để tạo phiên đấu giá.</p>
            )}
            {products.filter(p => p.status !== "SOLD").map((p) => (
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
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Duration (seconds)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleChange("duration", Number(e.target.value))}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Starting price</label>
                <input
                  type="number"
                  onChange={(e) => handleChange("startingPrice", Number(e.target.value))}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Minimum bid increment</label>
                <input
                  type="number"
                  onChange={(e) => handleChange("minimumBidIncrement", Number(e.target.value))}
                  className="border p-2 rounded"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Deposit</label>
                <input
                  type="number"
                  placeholder="0"
                  onChange={(e) => handleChange("depositAmount", Number(e.target.value))}
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
