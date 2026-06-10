import { fetchPublicAuctions } from "@/services/fetch_public_auctions"
import { fetchCategories } from "@/services/fetch_categories";
import AuctionCard from "./auction_card";
import { AuctionFilterSidebar } from "@/components/main/auction/auction_filter_sidebar";
import SortSelect from "./sort_select";
import { Auction } from "@/types/auction/auction";

function sortAuctions(auctions: Auction[], sort?: string): Auction[] {
    const sorted = [...auctions];
    switch (sort) {
        case "lowest":
            return sorted.sort((a, b) => a.starting_price - b.starting_price);
        case "highest":
            return sorted.sort((a, b) => b.starting_price - a.starting_price);
        case "ending":
            return sorted.sort((a, b) => {
                const aEnd = a.end_time ? new Date(a.end_time).getTime() : Infinity;
                const bEnd = b.end_time ? new Date(b.end_time).getTime() : Infinity;
                return aEnd - bEnd;
            });
        case "newest":
        default:
            return sorted.sort((a, b) => {
                const aStart = new Date(a.start_time).getTime();
                const bStart = new Date(b.start_time).getTime();
                return bStart - aStart;
            });
    }
}

export default async function Auctions({
    categoryId,
    categoryName,
    searchTerm,
    searchStatus,
    priceFrom,
    priceTo,
    attributes,
    backHref,
    sort,
}: {
    categoryId?: string;
    categoryName?: string;
    searchTerm?: string;
    searchStatus?: string;
    priceFrom?: string;
    priceTo?: string;
    attributes?: string[];
    backHref?: string;
    sort?: string;
}) {
    const [cards, categories] = await Promise.all([
        fetchPublicAuctions(categoryId, searchTerm, searchStatus, priceFrom, priceTo, attributes),
        fetchCategories(),
    ]);

    const visibleCards = sortAuctions(
        cards.filter((card) =>
            card.approval_status === "APPROVED" &&
            (card.auction_status === "UPCOMING" || card.auction_status === "LIVE")
        ),
        sort
    );

    const pageTitle = categoryName || "Online Auction Marketplace";
    const pageDescription = categoryName
        ? `Found ${visibleCards.length} auctions in this category`
        : `Found ${visibleCards.length} live auctions`;

    return (
        <div className="flex min-h-screen bg-(--background-color)">
            {/* Sidebar - Reduce size to increase space for cards */}
            <aside className="w-[22%] sticky top-0 h-screen border-r border-gray-100 bg-white p-6 hidden md:block">
                <AuctionFilterSidebar
                    categories={categories}
                    activeCategoryId={categoryId}
                    initialSearchTerm={searchTerm}
                    initialStatus={searchStatus}
                    initialPriceFrom={priceFrom}
                    initialPriceTo={priceTo}
                    initialAttributes={attributes}
                />
            </aside>

            {/* Main content - Increase size slightly */}
            <main className="w-full md:w-[78%] p-6 lg:p-8">
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
                        <p className="text-sm text-gray-500 mt-1">{pageDescription}</p>
                    </div>
                    
                    <SortSelect currentSort={sort} />
                </header>

                {/* Grid - Reduce gap from 6 to 4 so cards fit better */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {visibleCards.map((card) => (
                        <AuctionCard key={card.auction_id} auctionCard={card} />
                    ))}
                </div>

                {/* Empty state */}
                {visibleCards.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <p className="text-gray-400">No matching auctions found.</p>
                        {backHref && (
                            <a
                                href={backHref}
                                className="mt-4 inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-[#19A7CE] hover:text-[#19A7CE]"
                            >
                                Back to all auctions
                            </a>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}