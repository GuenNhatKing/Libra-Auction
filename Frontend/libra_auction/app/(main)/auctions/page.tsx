import Auctions from "@/components/main/auction/auctions";

export default function page(props: { searchParams?: { name?: string; status?: string; priceFrom?: string; priceTo?: string } }) {
    return (
        <Auctions
            searchTerm={props.searchParams?.name}
            searchStatus={props.searchParams?.status}
            priceFrom={props.searchParams?.priceFrom}
            priceTo={props.searchParams?.priceTo}
        />
    );
}