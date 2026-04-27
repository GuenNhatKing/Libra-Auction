package io.github.guennhatking.libra_auction.viewmodels.request;

public record AttributeRequest(
        String key,
        String value,
        boolean isSystem) {
}
