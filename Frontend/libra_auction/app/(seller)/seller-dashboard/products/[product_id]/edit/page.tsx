'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductEditForm from "@/components/seller/product_edit_form";
import { ProductDetailData } from "@/types/product_type";
import { fetchProductDetail } from "@/services/fetch_product_detail";
import { apiRequest } from "@/services/api_request";

export default function EditProductPage() {
    const params = useParams();

    const [product, setProduct] = useState<ProductDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!params.product_id || Array.isArray(params.product_id)) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);

                const data = await fetchProductDetail(params.product_id);
                console.log("Fetched product detail for editing:", data);
                setProduct(data);
            } catch (e) {
                console.error("Fetch error:", e);
            } finally {
                setLoading(false);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [params.product_id]);

    // loading UI
    if (loading) {
        return <div className="p-10 text-center">Đang tải dữ liệu...</div>;
    }

    // not found
    if (!product) {
        return <div className="p-10 text-center text-red-500">Không tìm thấy sản phẩm</div>;
    }

    return (
        <div className="p-6">
            <ProductEditForm
                initialData={product}
                onSubmit={async (formData) => {
                    try {
                        if (!params.product_id || Array.isArray(params.product_id)) return;

                        console.log("Submitting PUT...");

                        await apiRequest(
                            `/api/products/${params.product_id}`,
                            {
                                method: "PUT",
                                body: formData,
                            }
                        );

                        alert("Cập nhật thành công!");
                    } catch (e) {
                        console.error("Update error:", e);
                        alert("Cập nhật thất bại!");
                    }
                }}
            />
        </div>
    );
}