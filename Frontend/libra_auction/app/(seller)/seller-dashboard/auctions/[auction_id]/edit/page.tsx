"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuctionEditForm } from "@/components/seller/auction/auction_edit_form";
import { AuctionFormData } from "@/types/auction_type";
import { apiRequest } from "@/services/api_request";
import { mapApiAuctionToForm } from "@/mappers/auction_form_mapper";
import { ApiAuctionType } from "@/types/api_types";

export default function EditAuctionPage() {
    const params = useParams();
    const router = useRouter();

    const [auctionData, setAuctionData] = useState<AuctionFormData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuction = async () => {
            if (!params.auction_id || Array.isArray(params.auction_id)) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const data = await apiRequest<ApiAuctionType>(
                    `/api/auction-sessions/${params.auction_id}`
                );

                console.log("Fetched auction detail:", data);

                const mapped: AuctionFormData = mapApiAuctionToForm(data);

                setAuctionData(mapped);
            } catch (e) {
                console.error("Fetch error:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [params.auction_id]);

    if (loading) {
        return <div className="p-10 text-center">Đang tải dữ liệu...</div>;
    }

    if (!auctionData) {
        return <div className="p-10 text-center text-red-500">Không tìm thấy phiên đấu giá</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* BACK BUTTON */}
            <button
                onClick={() => router.push("/seller-dashboard/auctions")}
                className="mb-6 text-sm text-gray-600 hover:text-[var(--primary-color)] transition-colors"
            >
                ← Quay lại danh sách
            </button>

            <AuctionEditForm
                initialData={auctionData}
                onSubmit={async (formData) => {
                    try {
                        if (!params.auction_id || Array.isArray(params.auction_id)) return;

                        console.log("Submitting PUT...");

                        await apiRequest(
                            `/api/auction-sessions/${params.auction_id}`,
                            {
                                method: "PUT",
                                body: formData
                            }
                        );

                        alert("Cập nhật thành công!");
                        router.push("/seller-dashboard/auctions");
                    } catch (e) {
                        console.error("Update error:", e);
                        alert("Cập nhật thất bại!");
                    }
                }}
                isUpdating={true}
            />
        </div>
    );
}