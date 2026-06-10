import Auctions from "@/components/main/auction/auctions";

type AuctionSearchParams = {
    name?: string;
    status?: string;
    priceFrom?: string;
    priceTo?: string;
    attr?: string | string[];
    sort?: string;
    page?: string;
};

export default async function page(props: { searchParams?: Promise<AuctionSearchParams> }) {
    const searchParams = await props.searchParams;
    const attrs = searchParams?.attr
        ? (Array.isArray(searchParams.attr) ? searchParams.attr : [searchParams.attr])
        : undefined;
    return (
        <Auctions
            searchTerm={searchParams?.name}
            searchStatus={searchParams?.status}
            priceFrom={searchParams?.priceFrom}
            priceTo={searchParams?.priceTo}
            attributes={attrs}
            sort={searchParams?.sort}
            page={searchParams?.page ? Number(searchParams.page) : 0}
        />
    );
}
