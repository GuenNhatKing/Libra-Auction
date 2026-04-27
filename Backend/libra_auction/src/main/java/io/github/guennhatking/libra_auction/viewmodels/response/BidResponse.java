package io.github.guennhatking.libra_auction.viewmodels.response;

import java.time.LocalDateTime;

public record BidResponse(
        String auctionId,
        Long bidAmount,
        String bidderId,
        String bidderName,
        LocalDateTime bidTime,
        String status) {
}