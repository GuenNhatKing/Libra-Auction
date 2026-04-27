package io.github.guennhatking.libra_auction.viewmodels.request;

public record GoogleUserInfo(
        String sub,
        String email,
        String name,
        String picture) {
}
