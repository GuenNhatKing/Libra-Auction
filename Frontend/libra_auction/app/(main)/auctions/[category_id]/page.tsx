import Auctions from "@/components/main/auction/auctions";
import { fetchCategories } from "@/services/fetch_categories";
import { notFound } from "next/navigation";

type AuctionSearchParams = {
    name?: string;
    status?: string;
    priceFrom?: string;
    priceTo?: string;
};

export default async function page(props: {
    params: Promise<{ category_id: string }>;
    searchParams?: Promise<AuctionSearchParams>;
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const categories = await fetchCategories();

    const category = categories.find((item) => item.id === params.category_id);

    if (!category) {
        notFound();
    }

    return (
        <Auctions
            categoryId={params.category_id}
            categoryName={category.title}
            searchTerm={searchParams?.name}
            searchStatus={searchParams?.status}
            priceFrom={searchParams?.priceFrom}
            priceTo={searchParams?.priceTo}
            backHref="/auctions"
        />
    );
}