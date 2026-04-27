"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AuctionDetail } from "@/components/seller/auction/auction_detail";
import { AuctionDetailData } from "@/types/auction_type";
import { apiRequest } from "@/services/api_request";

export default function Page() {
    const params = useParams();
    const auction_id = params.auction_id as string;

    const [data, setData] = useState<AuctionDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiRequest<any>(
                    `/api/auction-sessions/${auction_id}`
                );

                console.log("API raw:", res);

                // 👉 map backend → frontend
                const mapped: AuctionDetailData = {
                    id: res.auction_id,
                    auction_name: res.auction_name,
                    starting_price: res.starting_price,
                    description: res.description,
                    questions: []
                };

                setData(mapped);
            } catch (err) {
                console.error("Fetch error:", err);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        if (auction_id) {
            fetchData();
        }
    }, [auction_id]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            {data ? (
                <AuctionDetail data={data} />
            ) : (
                <p>Auction not found</p>
            )}
        </>
    );
}