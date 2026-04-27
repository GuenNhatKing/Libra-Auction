package io.github.guennhatking.libra_auction.viewmodels.response;

import java.util.List;

public record ProductResponse(
        String product_id,
        String product_name,
        String category_id,
        String category_name,
        Integer quantity,
        String description,

        List<String> images,
        List<AttributeResponse> attributes
) {
}