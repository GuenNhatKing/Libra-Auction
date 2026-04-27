import Auctions from "@/components/auctions";

export default function page(props: { params: Promise<{ category_id: string }> }) {
    return (
        <Auctions />
    );
}