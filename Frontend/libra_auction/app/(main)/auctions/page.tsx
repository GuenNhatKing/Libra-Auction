import Auctions from "@/components/main/auction/auctions";

type AuctionSearchParams = {
    name?: string;
    status?: string;
    priceFrom?: string;
    priceTo?: string;
};

export default async function page(props: { searchParams?: Promise<AuctionSearchParams> }) {
    const searchParams = await props.searchParams;
    return (
        <Auctions
            searchTerm={searchParams?.name}
            searchStatus={searchParams?.status}
            priceFrom={searchParams?.priceFrom}
            priceTo={searchParams?.priceTo}
        />
    );
}