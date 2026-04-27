"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProductDetail } from "@/components/seller/product/product_detail";
import { ProductDetailData } from "@/types/product_type";
import { fetchProductDetail } from "@/services/fetch_product_detail";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("Fetching product detail for ID:", params.product_id);
      if (!params.product_id || Array.isArray(params.product_id)) {
        setLoading(false);
        return;
      }
      const product = await fetchProductDetail(params.product_id);
      setProduct(product);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [params.product_id]);

  if (loading) return <div className="p-10 text-center text-gray-400 italic">Đang tải tài sản...</div>;
  if (!product) return <div className="p-10 text-center text-red-500 font-bold">Không tìm thấy tài sản!</div>;

  return (
    <main className="p-6 md:p-10 bg-[--background-color] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[--primary-color] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          Danh sách tài sản
        </button>

        <ProductDetail data={product} />
      </div>
    </main>
  );
}