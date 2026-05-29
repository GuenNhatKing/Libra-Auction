package io.github.guennhatking.libra_auction.models.auction;

/**
 * DAU_GIA_LEN (English Auction - Ascending)
 *
 * Rules:
 * - Starting price: startingPrice (minimum acceptable price)
 * - Bidders compete by placing increasingly higher bids
 * - Each new bid must exceed the previous bid by at least minimumBidIncrement
 * - Highest bidder at the end of the auction wins
 * - All bids are visible to all participants
 */
public class AscendingBid {
    private String id;
    private String auctionId;

    // Current highest bid
    private long currentPrice;

    // Minimum bidding increment required between consecutive bids
    private long minimumBidIncrement;

    // Current highest bidder information
    private String bidderId;
    private String bidderName;

    // Number of bids placed in this auction
    private int totalBids;

    // CONSTRUCTOR
    public AscendingBid() {
        this.totalBids = 0;
    }

    public AscendingBid(long minimumBidIncrement) {
        this.minimumBidIncrement = minimumBidIncrement;
        this.currentPrice = 0;
        this.totalBids = 0;
    }

    // BUSINESS LOGIC METHODS

    /**
     * Validate if a new bid is acceptable for ascending auction
     * @param newBidAmount The new bid amount to validate
     * @return true if valid, false otherwise
     */
    public boolean isValidBid(long newBidAmount) {
        return newBidAmount >= currentPrice + minimumBidIncrement;
    }

    /**
     * Get the minimum acceptable bid for the next round
     * @return Minimum amount for the next bid
     */
    public long getNextMinimumBid() {
        return currentPrice + minimumBidIncrement;
    }

    /**
     * Record a new winning bid
     * @param bidAmount The bid amount
     * @param bidderId ID of the bidder
     * @param bidderName Name of the bidder
     */
    public void placeBid(long bidAmount, String bidderId, String bidderName) {
        if (isValidBid(bidAmount)) {
            this.currentPrice = bidAmount;
            this.bidderId = bidderId;
            this.bidderName = bidderName;
            this.totalBids++;
        }
    }

    // GETTER
    public String getId() {
        return id;
    }

    public String getAuctionId() {
        return auctionId;
    }

    public long getCurrentPrice() {
        return currentPrice;
    }

    public long getMinimumBidIncrement() {
        return minimumBidIncrement;
    }

    public String getBidderId() {
        return bidderId;
    }

    public String getBidderName() {
        return bidderName;
    }

    public int getTotalBids() {
        return totalBids;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setAuctionId(String auctionId) {
        this.auctionId = auctionId;
    }

    public void setCurrentPrice(long currentPrice) {
        this.currentPrice = currentPrice;
    }

    public void setMinimumBidIncrement(long minimumBidIncrement) {
        this.minimumBidIncrement = minimumBidIncrement;
    }

    public void setBidderId(String bidderId) {
        this.bidderId = bidderId;
    }

    public void setBidderName(String bidderName) {
        this.bidderName = bidderName;
    }

    public void setTotalBids(int totalBids) {
        this.totalBids = totalBids;
    }
}
