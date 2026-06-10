import { AuctionList } from "@/components/seller/auction/auction_list";
import { fetchAuctions } from "@/services/fetch_auctions";

export default async function page() {
    const auctionPage = await fetchAuctions(0, 100);
    return (
        <AuctionList auctions={auctionPage.content} />
    );
}
