import { Auction } from "@/types/auction/auction";
import { UpcomingAuction } from "@/types/auction/upcoming_auction";

export const mapAuctionToUpcoming = (auction: Auction): UpcomingAuction => {
  return {
    id: auction.auction_id,
    
    // Use first image, fall back to default if none
    image_src: auction.images && auction.images.length > 0 
      ? auction.images[0] 
      : "/images/placeholder-upcoming.jpg",
    
    title: auction.auction_name,
    
    // For upcoming auctions, show the starting price
    starting_bid: auction.starting_price,
    
    // Number of registered participants or interested bidders (based on total_participants)
    bidders: auction.total_participants || 0,
    
    // Convert to Date object if start_time is a string
    starting_date: new Date(auction.start_time),
    
    category_id: auction.category_id
  };
};