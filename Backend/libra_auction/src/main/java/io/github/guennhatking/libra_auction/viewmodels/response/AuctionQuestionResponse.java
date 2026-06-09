package io.github.guennhatking.libra_auction.viewmodels.response;

import java.time.OffsetDateTime;

public record AuctionQuestionResponse(
        String id,
        String user_id,
        String user_name,
        String avatar_url,
        String content,
        OffsetDateTime created_at,
        AuctionQuestionAnswerResponse answer,
        String question_status) {
}