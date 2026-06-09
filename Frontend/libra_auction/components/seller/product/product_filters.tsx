"use client";

export type ProductFilterFields = {
  searchName: string;
  category: string;
  minQuantity: string;
  maxQuantity: string;
};

export const defaultProductFilters: ProductFilterFields = {
  searchName: "",
  category: "ALL",
  minQuantity: "",
  maxQuantity: "",
};

interface ProductFiltersProps {
  filters: ProductFilterFields;
  onChange: (filters: ProductFilterFields) => void;
  categoryOptions: string[];
}

export const ProductFilters = ({ filters, onChange, categoryOptions }: ProductFiltersProps) => {
  const update = (partial: Partial<ProductFilterFields>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Product Filters</h3>
          <p className="text-sm text-gray-500">Filter by name, category and quantity.</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(defaultProductFilters)}
          className="rounded-lg bg-(--background-color) px-4 py-2 text-sm font-semibold text-(--primary-color) hover:bg-(--accent-color) transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Product name
          <input
            type="search"
            value={filters.searchName}
            onChange={(e) => update({ searchName: e.target.value })}
            placeholder="Search by name"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Category
          <select
            value={filters.category}
            onChange={(e) => update({ category: e.target.value })}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          >
            <option value="ALL">All categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Min quantity
          <input
            type="number"
            min="0"
            value={filters.minQuantity}
            onChange={(e) => update({ minQuantity: e.target.value })}
            placeholder="From"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>

        <label className="space-y-1.5 text-sm font-semibold text-gray-700">
          Max quantity
          <input
            type="number"
            min="0"
            value={filters.maxQuantity}
            onChange={(e) => update({ maxQuantity: e.target.value })}
            placeholder="To"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-normal text-gray-600 outline-none focus:border-(--primary-color) focus:ring-1 focus:ring-(--primary-color) transition-all"
          />
        </label>
      </div>
    </div>
  );
};
