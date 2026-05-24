"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductDeleteConfirm from "@/components/seller/product_delete_confirm";
import { Product } from "@/types/product/product";
import { fetchProduct } from "@/services/fetch_product";
import { deleteProduct } from "@/services/delete_product";

export default function DeleteProductPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch product
  useEffect(() => {
    const loadProduct = async () => {
      if (!params.product_id || Array.isArray(params.product_id)) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchProduct(params.product_id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        window.location.replace("/seller-dashboard/products");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [params.product_id]);

  // 2. Handle DELETE
  const handleDelete = async () => {
    if (!params.product_id || Array.isArray(params.product_id)) return;

    try {
      console.log("Deleting product:", params.product_id);

      await deleteProduct(params.product_id);

      alert("Deleted successfully!");

      window.location.replace("/seller-dashboard/products")
    } catch (err) {
      console.error("Delete API error:", err);
      alert("Failed to delete product!");
    }
  };

  // UI loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F1F1]">
        <div className="text-[#146C94] font-bold animate-pulse">
          Loading information...
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
        onCancel={() => {
          window.location.replace("/seller-dashboard/products");
        }}
      />
    </div>
  );
}