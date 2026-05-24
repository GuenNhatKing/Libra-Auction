"use client";
import { useState } from "react";
import { Product } from "@/types/product/product";

interface ProductDeleteConfirmProps {
  product: Product;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export default function ProductDeleteConfirm({ product, onDelete, onCancel }: ProductDeleteConfirmProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-xl max-w-md w-full animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col items-center text-center">
        {/* Warning icon */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"/>
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-800">Confirm product deletion</h2>
        <p className="text-sm text-gray-500 mt-2">
          Are you sure you want to delete this product? Related data will be removed from the system.
        </p>

        {/* Product info box */}
        <div className="w-full bg-[#F6F1F1] p-4 rounded-xl mt-6 text-left border border-gray-100">
          <p className="text-[10px] font-bold text-[#146C94] uppercase tracking-widest">Product name</p>
          <p className="text-sm font-bold text-gray-800 truncate">{product.product_name}</p>
          
          <p className="text-[10px] font-bold text-[#146C94] uppercase tracking-widest mt-3">Short description</p>
          <p className="text-xs text-gray-600 line-clamp-2 italic">
            {product.description || "No description is available for this product."}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 w-full mt-8">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-100 active:scale-95 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Confirm delete"}
          </button>
        </div>
      </div>
    </div>
  );
}