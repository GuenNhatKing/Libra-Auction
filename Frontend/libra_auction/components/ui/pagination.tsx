"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        &larr; Prev
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 py-2 text-sm text-gray-400 select-none">
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page as number)}
            className={`min-w-[36px] px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
              page === currentPage
                ? "bg-(--primary-color) text-white border-(--primary-color)"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {(page as number) + 1}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        Next &rarr;
      </button>
    </nav>
  );
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }

  const pages: (number | "...")[] = [0];

  if (current > 2) {
    pages.push("...");
  }

  const start = Math.max(1, current - 1);
  const end = Math.min(total - 2, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 3) {
    pages.push("...");
  }

  pages.push(total - 1);

  return pages;
}

// Server-compatible pagination using <a> links
interface PaginationLinksProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

export function PaginationLinks({ currentPage, totalPages, buildHref }: PaginationLinksProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageNumbers(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-6" aria-label="Pagination">
      {currentPage > 0 ? (
        <a
          href={buildHref(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Previous page"
        >
          &larr; Prev
        </a>
      ) : (
        <span className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-100 text-gray-300 cursor-not-allowed">
          &larr; Prev
        </span>
      )}

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 py-2 text-sm text-gray-400 select-none">
            &hellip;
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            className="min-w-[36px] px-3 py-2 text-sm font-medium rounded-lg bg-(--primary-color) text-white border border-(--primary-color)"
            aria-current="page"
          >
            {(page as number) + 1}
          </span>
        ) : (
          <a
            key={page}
            href={buildHref(page as number)}
            className="min-w-[36px] px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-center"
          >
            {(page as number) + 1}
          </a>
        )
      )}

      {currentPage < totalPages - 1 ? (
        <a
          href={buildHref(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          aria-label="Next page"
        >
          Next &rarr;
        </a>
      ) : (
        <span className="px-3 py-2 text-sm font-medium rounded-lg border border-gray-100 text-gray-300 cursor-not-allowed">
          Next &rarr;
        </span>
      )}
    </nav>
  );
}

interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  totalElements: number;
}

export function PaginationInfo({ currentPage, pageSize, totalElements }: PaginationInfoProps) {
  if (totalElements === 0) return null;

  const start = currentPage * pageSize + 1;
  const end = Math.min((currentPage + 1) * pageSize, totalElements);

  return (
    <p className="text-sm text-gray-500">
      Showing <span className="font-medium text-gray-700">{start}</span>
      {" "}&ndash;{" "}
      <span className="font-medium text-gray-700">{end}</span>
      {" "}of{" "}
      <span className="font-medium text-gray-700">{totalElements}</span>
    </p>
  );
}
