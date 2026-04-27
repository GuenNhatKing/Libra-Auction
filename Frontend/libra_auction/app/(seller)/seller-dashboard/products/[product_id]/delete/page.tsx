"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductDeleteConfirm from "@/components/seller/product_delete_confirm";
import { Product } from "@/types/product_type";
import { apiRequest } from "@/services/api_request";

export default function DeleteProductPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch product thật
  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.product_id || Array.isArray(params.product_id)) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("Fetching product:", params.product_id);

        const data = await apiRequest<Product>(
          `/api/products/${params.product_id}`
        );

        console.log("Fetched product:", data);

        setProduct(data);
      } catch (err) {
        console.error("Lỗi fetch tài sản:", err);
        router.push("/seller-dashboard/products/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.product_id, router]);

  // 2. Xử lý DELETE
  const handleDelete = async () => {
    if (!params.product_id || Array.isArray(params.product_id)) return;

    try {
      console.log("Deleting product:", params.product_id);

      await apiRequest(
        `/api/products/${params.product_id}`,
        {
          method: "DELETE",
        }
      );

      alert("Xóa thành công!");

      // redirect sau khi xóa
      router.push("/seller-dashboard/products/");
      router.refresh();
    } catch (err) {
      console.error("Lỗi API xóa:", err);
      alert("Xóa tài sản thất bại!");
    }
  };

  // UI loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F1F1]">
        <div className="text-[#146C94] font-bold animate-pulse">
          Đang tải thông tin...
        </div>
      </div>
    );
  }

  // không có data
  if (!product) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F1F1] p-6">
      <ProductDeleteConfirm
        product={product}
        onDelete={handleDelete}
        onCancel={() => router.back()}
      />
    </div>
  );
}