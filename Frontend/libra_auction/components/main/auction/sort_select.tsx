'use client';

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Lowest price" },
  { value: "highest", label: "Highest price" },
  { value: "ending", label: "Ending soon" },
] as const;

export default function SortSelect({ currentSort }: { currentSort?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <select
      value={currentSort ?? ""}
      onChange={handleChange}
      className="bg-white text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-(--primary-color) cursor-pointer"
    >
      <option value="">Sort by</option>
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
