package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.OffsetDateTime;

import io.github.guennhatking.libra_auction.validators.FutureTime;

public record AuctionUpdateRequest(
    @NotNull(message = "startTime is required")
    @FutureTime(message = "startTime must be in the future")
    OffsetDateTime startTime,

        @NotNull(message = "duration is required") @Positive(message = "duration must be greater than 0") Long duration,

        @NotNull(message = "startingPrice is required") @Positive(message = "startingPrice must be greater than 0") Long startingPrice,

        @NotNull(message = "minimumBidIncrement is required") @Positive(message = "minimumBidIncrement must be greater than 0") Long minimumBidIncrement,

        @NotNull(message = "depositAmount is required") @PositiveOrZero(message = "depositAmount must be greater than or equal 0") Long depositAmount
) {
}
