package io.github.guennhatking.libra_auction.viewmodels.request;

public record BidMessage(
        String auctionId,
        Long bidAmount,
        String bidderId,
        String bidderName) {
}
