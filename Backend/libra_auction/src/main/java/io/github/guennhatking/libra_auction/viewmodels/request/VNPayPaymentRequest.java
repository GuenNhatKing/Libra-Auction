package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;

public record VNPayPaymentRequest(
        @NotBlank(message = "Auction ID is required")
        String auctionId,

        @NotBlank(message = "Auction result ID is required")
        String auctionResultId
) {}
