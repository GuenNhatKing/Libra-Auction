package io.github.guennhatking.libra_auction.viewmodels.response;

import java.time.LocalDateTime;
import java.util.List;

public record AuctionSessionResponse(
        String category_id,
        String category_name,
        String auction_id,
        String auction_name,
        String auction_status,
        String auction_type,
        LocalDateTime start_time,
        Long duration,

        Long starting_price,
        Long current_price,
        Long min_bid_increment,

        String product_id,
        String product_name,
        Integer quantity,
        String description,

        List<String> images,
        List<AttributeResponse> attributes,

        Integer total_bids,
        Integer total_participants) {
}