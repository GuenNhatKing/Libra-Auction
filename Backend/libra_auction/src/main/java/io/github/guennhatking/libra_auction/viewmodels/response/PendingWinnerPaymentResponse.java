package io.github.guennhatking.libra_auction.viewmodels.response;

public record PendingWinnerPaymentResponse(
        String auctionId,
        String auctionResultId,
        String auctionName,
        String productName,
        long amount,
        String status,
        String endedAt) {
}
