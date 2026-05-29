"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuctionEditForm } from "@/components/seller/auction/auction_edit_form";
import { NewAuction } from "@/types/auction/new-auction";
import { fetchAuction } from "@/services/fetch_auction";
import { updateAuction } from "@/services/update_auction";

export default function EditAuctionPage() {
    const params = useParams();
    const router = useRouter();

    const [auctionData, setAuctionData] = useState<NewAuction | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAuction = async () => {
            if (!params.auction_id || Array.isArray(params.auction_id)) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const data = await fetchAuction(params.auction_id);
                const newAuction: NewAuction = {
                    productId: data.product_id,
                    minimumBidIncrement: data.min_bid_increment,
                    startingPrice: data.starting_price,
                    startTime: data.start_time,
                    duration: data.duration,
                    depositAmount: data.deposit_amount
                }
                setAuctionData(newAuction);
            } catch (e) {
                console.error("Fetch error:", e);
            } finally {
                setLoading(false);
            }
        };

        loadAuction();
    }, [params.auction_id]);

    if (loading) {
        return <div className="p-10 text-center">Loading data...</div>;
    }

    if (!auctionData) {
        return <div className="p-10 text-center text-red-500">Auction not found</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* BACK BUTTON */}
            <button
                onClick={() => router.push("/seller-dashboard/auctions")}
                className="mb-6 text-sm text-gray-600 hover:text-(--primary-color) transition-colors"
            >
                Back to list
            </button>

            <AuctionEditForm
                initialData={auctionData}
                onSubmit={async (formData) => {
                    if (!params.auction_id || Array.isArray(params.auction_id)) {
                        return;
                    }

                    const newAuction: NewAuction = {
                        productId: formData.productId,
                        minimumBidIncrement: formData.minimumBidIncrement,
                        startingPrice: formData.startingPrice,
                        startTime: formData.startTime,
                        duration: formData.duration,
                        depositAmount: formData.depositAmount
                    };
                    const res = await updateAuction(params.auction_id, newAuction);
                    if (res) {
                        alert("Success! The auction was updated successfully.");
                        window.location.replace("/seller-dashboard/auctions/" + params.auction_id);
                    } else {
                        throw new Error("Backend returned an error");
                    }
                }}
                isUpdating={true}
            />
        </div>
    );
}