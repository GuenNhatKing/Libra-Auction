import { fetchLiveAuctions } from "@/services/fetch_live_auctions";
import LiveAuctionCard from "./live_auction_card";
import ShowMoreBtn from "../../show_more_btn";
import { LiveAuction } from "@/types/auction/live_auction";
export default async function LiveAuctionsSection() {
  const cards: LiveAuction[] = await fetchLiveAuctions();
  if(cards.length == 0) return null;
  return (
    <div className="py-16 bg-(--background-color)">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-bold text-4xl">Live Auctions</h2>
        <p>Join Live Auctions Happening Right Now</p>
      </div>
      <div className="grid grid-cols-1 gap-9 pt-6 px-18 md:grid-cols-2 xl:grid-cols-3 items-stretch">
        {cards.slice(0, 3).map((card) => {
          return <LiveAuctionCard key={card.id} card={card}/>;
        })}
      </div>
      <div className="flex justify-center pt-18">
        <ShowMoreBtn/>
      </div>
    </div>
  );
}
