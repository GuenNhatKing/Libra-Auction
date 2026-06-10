"use client";

import { useEffect, useMemo, useState } from "react";
import { Product } from "@/types/product/product";
import { ProductFilters, ProductFilterFields, defaultProductFilters } from "./product_filters";
import { ProductItem } from "./product_item";
import { useRouter } from "next/navigation";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";

const PAGE_SIZE = 20;

interface ProductListProps {
  initialData: Product[];
}

export const ProductList = ({ initialData }: ProductListProps) => {
  const [filters, setFilters] = useState<ProductFilterFields>(defaultProductFilters);
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const categoryOptions = useMemo(
    () => Array.from(new Set(initialData.map((p) => p.category_name).filter(Boolean))).sort(),
    [initialData]
  );

  const filteredProducts = useMemo(() => {
    const search = filters.searchName.trim().toLowerCase();
    const minQty = filters.minQuantity ? Number(filters.minQuantity) : null;
    const maxQty = filters.maxQuantity ? Number(filters.maxQuantity) : null;

    return initialData.filter((p) => {
      const matchesSearch =
        !search ||
        p.product_name.toLowerCase().includes(search) ||
        p.category_name.toLowerCase().includes(search);
      const matchesCategory = filters.category === "ALL" || p.category_name === filters.category;
      const matchesMinQty = minQty === null || p.quantity >= minQty;
      const matchesMaxQty = maxQty === null || p.quantity <= maxQty;

      return matchesSearch && matchesCategory && matchesMinQty && matchesMaxQty;
    });
  }, [initialData, filters]);

  useEffect(() => { setCurrentPage(0); }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = useMemo(
    () => filteredProducts.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE),
    [filteredProducts, currentPage],
  );

  return (
    <div className="space-y-4">
      <ProductFilters
        filters={filters}
        onChange={setFilters}
        categoryOptions={categoryOptions}
      />

      <div className="flex items-center justify-between">
        <PaginationInfo currentPage={currentPage} pageSize={PAGE_SIZE} totalElements={filteredProducts.length} />
        <button
          type="button"
          onClick={() => router.push("/seller-dashboard/products/new-product")}
          className="rounded-lg bg-(--primary-color) px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          + Create Product
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductItem
              key={product.product_id}
              product={product}
              onView={(id) => router.push(`/seller-dashboard/products/${id}`)}
              onEdit={(id) => router.push(`/seller-dashboard/products/${id}/edit`)}
              onDelete={(id) => router.push(`/seller-dashboard/products/${id}/delete`)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <svg className="w-12 h-12 text-gray-300 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-400 font-medium">No matching data found</p>
          </div>
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};
