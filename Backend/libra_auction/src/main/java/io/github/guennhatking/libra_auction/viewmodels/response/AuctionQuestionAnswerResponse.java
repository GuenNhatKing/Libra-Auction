package io.github.guennhatking.libra_auction.viewmodels.response;

import java.time.OffsetDateTime;

public record AuctionQuestionAnswerResponse(
        String content,
        OffsetDateTime replied_at) {
}