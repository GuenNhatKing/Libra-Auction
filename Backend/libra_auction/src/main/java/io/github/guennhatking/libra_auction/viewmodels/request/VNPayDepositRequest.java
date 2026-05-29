package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;

public record VNPayDepositRequest(
        @NotBlank(message = "Auction ID is required") String auctionId) {
}
