'use client';

import type { Category } from "@/types/category";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAttributeNames, fetchAttributeValues } from "@/services/fetch_standardized_attributes";

const statusOptions = [
    { label: "All", value: "" },
    { label: "Live", value: "LIVE" },
    { label: "Upcoming", value: "UPCOMING" },
];

type SelectedAttribute = { name: string; value: string };

export const AuctionFilterSidebar = ({
    categories,
    activeCategoryId = "",
    initialSearchTerm = "",
    initialStatus = "",
    initialPriceFrom = "",
    initialPriceTo = "",
    initialAttributes = [],
}: {
    categories: Category[];
    activeCategoryId?: string;
    initialSearchTerm?: string;
    initialStatus?: string;
    initialPriceFrom?: string;
    initialPriceTo?: string;
    initialAttributes?: string[];
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Lưu các lựa chọn vào state tạm thời
    const [selectedCategoryId, setSelectedCategoryId] = useState(activeCategoryId);
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);
    const [priceFrom, setPriceFrom] = useState(initialPriceFrom);
    const [priceTo, setPriceTo] = useState(initialPriceTo);

    // Attribute filter state
    const [attributeNames, setAttributeNames] = useState<string[]>([]);
    const [attributeValues, setAttributeValues] = useState<{ id: string; attributeName: string; attributeValue: string }[]>([]);
    const [selectedAttributeName, setSelectedAttributeName] = useState("");
    const [selectedAttributeValue, setSelectedAttributeValue] = useState("");
    const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttribute[]>(() =>
        initialAttributes
            .map((attr) => {
                const idx = attr.indexOf(":");
                if (idx > 0 && idx < attr.length - 1) {
                    return { name: attr.substring(0, idx), value: attr.substring(idx + 1) };
                }
                return null;
            })
            .filter((a): a is SelectedAttribute => a !== null)
    );

    // Load attribute names on mount
    useEffect(() => {
        fetchAttributeNames().then(setAttributeNames);
    }, []);

    // Load attribute values when name changes
    useEffect(() => {
        if (!selectedAttributeName) {
            setAttributeValues([]);
            setSelectedAttributeValue("");
            return;
        }
        fetchAttributeValues(selectedAttributeName).then(setAttributeValues);
        setSelectedAttributeValue("");
    }, [selectedAttributeName]);

    const handleAddAttribute = () => {
        if (!selectedAttributeName || !selectedAttributeValue) return;
        const exists = selectedAttributes.some(
            (a) => a.name === selectedAttributeName && a.value === selectedAttributeValue
        );
        if (exists) return;
        setSelectedAttributes((prev) => [...prev, { name: selectedAttributeName, value: selectedAttributeValue }]);
        setSelectedAttributeName("");
        setSelectedAttributeValue("");
    };

    const handleRemoveAttribute = (index: number) => {
        setSelectedAttributes((prev) => prev.filter((_, i) => i !== index));
    };

    // Xử lý gom toàn bộ filter và đẩy lên URL khi bấm nút Apply
    const handleApplyFilters = () => {
        const query = new URLSearchParams(searchParams.toString());

        if (searchTerm.trim()) {
            query.set("name", searchTerm.trim());
        } else {
            query.delete("name");
        }

        if (selectedStatus) {
            query.set("status", selectedStatus);
        } else {
            query.delete("status");
        }

        if (priceFrom.trim()) {
            query.set("priceFrom", priceFrom.trim());
        } else {
            query.delete("priceFrom");
        }

        if (priceTo.trim()) {
            query.set("priceTo", priceTo.trim());
        } else {
            query.delete("priceTo");
        }

        // Attribute filters
        query.delete("attr");
        for (const attr of selectedAttributes) {
            query.append("attr", `${attr.name}:${attr.value}`);
        }

        const queryString = query.toString();

        // Nếu chọn danh mục cụ thể thì trỏ sang đường dẫn động, ngược lại về /auctions tổng quát
        const targetPath = selectedCategoryId ? `/auctions/${selectedCategoryId}` : "/auctions";

        router.push(queryString ? `${targetPath}?${queryString}` : targetPath);
    };

    return (
        <div className="space-y-8">
            {/* SEARCH */}
            <div>
                <h3 className="font-bold text-[#146C94] mb-4 uppercase text-xs tracking-widest">Search</h3>
                <input 
                    type="text" 
                    placeholder="Auction or product name..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full pl-3 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:border-(--primary-color) transition-all"
                />
            </div>

            {/* CATEGORIES */}
            <div>
                <h3 className="font-bold text-[#146C94] mb-4 uppercase text-xs tracking-widest">Categories</h3>
                <select
                    value={selectedCategoryId}
                    onChange={(event) => setSelectedCategoryId(event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition-all focus:border-(--primary-color)"
                >
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* PRICE RANGE */}
            <div>
                <h3 className="font-bold text-[#146C94] mb-4 uppercase text-xs tracking-widest">Price range (VND)</h3>
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="number"
                        placeholder="From"
                        value={priceFrom}
                        onChange={(event) => setPriceFrom(event.target.value)}
                        className="w-full rounded-lg border border-gray-100 bg-gray-50 p-2 text-xs outline-none"
                    />
                    <input
                        type="number"
                        placeholder="To"
                        value={priceTo}
                        onChange={(event) => setPriceTo(event.target.value)}
                        className="w-full rounded-lg border border-gray-100 bg-gray-50 p-2 text-xs outline-none"
                    />
                </div>
            </div>

            {/* STATUS */}
            <div>
                <h3 className="font-bold text-[#146C94] mb-4 uppercase text-xs tracking-widest">Status</h3>
                <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => {
                        const isActive = selectedStatus === status.value;

                        return (
                            <button
                                key={status.label}
                                type="button"
                                onClick={() => setSelectedStatus(status.value)}
                                className={`rounded-xl border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all ${
                                    isActive
                                        ? "border-(--primary-color) bg-(--primary-color) text-white shadow-sm"
                                        : "border-gray-200 bg-white text-gray-800 hover:bg-(--primary-color) hover:text-white"
                                }`}
                            >
                                {status.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ATTRIBUTES */}
            <div>
                <h3 className="font-bold text-[#146C94] mb-4 uppercase text-xs tracking-widest">Attributes</h3>
                <div className="space-y-2">
                    <select
                        value={selectedAttributeName}
                        onChange={(e) => setSelectedAttributeName(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition-all focus:border-(--primary-color)"
                    >
                        <option value="">Select attribute...</option>
                        {attributeNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                    <select
                        value={selectedAttributeValue}
                        onChange={(e) => setSelectedAttributeValue(e.target.value)}
                        disabled={!selectedAttributeName}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition-all focus:border-(--primary-color) disabled:opacity-50"
                    >
                        <option value="">Select value...</option>
                        {attributeValues.map((attr) => (
                            <option key={attr.id} value={attr.attributeValue}>{attr.attributeValue}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={handleAddAttribute}
                        disabled={!selectedAttributeName || !selectedAttributeValue}
                        className="w-full rounded-xl border border-dashed border-(--primary-color) py-2 text-xs font-semibold text-(--primary-color) transition-all hover:bg-(--primary-color) hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-(--primary-color)"
                    >
                        + Add filter
                    </button>
                </div>
                {selectedAttributes.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {selectedAttributes.map((attr, index) => (
                            <span
                                key={`${attr.name}:${attr.value}`}
                                className="inline-flex items-center gap-1 rounded-lg bg-(--primary-color)/10 px-2.5 py-1 text-xs text-(--primary-color)"
                            >
                                {attr.name}: {attr.value}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveAttribute(index)}
                                    className="ml-0.5 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* TỔNG HỢP FILTER BUTTON */}
            <button
                type="button"
                onClick={handleApplyFilters}
                className="w-full rounded-xl py-3 bg-(--secondary-color) text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-100 transition-all hover:bg-[#1598bc] active:scale-[0.98] active:bg-[#117f9c]"
            >
                APPLY FILTERS
            </button>
        </div>
    );
};