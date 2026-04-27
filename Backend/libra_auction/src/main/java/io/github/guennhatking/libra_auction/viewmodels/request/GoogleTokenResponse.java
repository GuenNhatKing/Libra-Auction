package io.github.guennhatking.libra_auction.viewmodels.request;

public record GoogleTokenResponse(
        String accessToken,
        String idToken,
        String tokenType,
        Integer expiresIn) {
}
