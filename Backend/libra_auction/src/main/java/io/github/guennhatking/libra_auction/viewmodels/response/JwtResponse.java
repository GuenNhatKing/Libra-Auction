package io.github.guennhatking.libra_auction.viewmodels.response;

public record JwtResponse(
        String token,
        String refreshToken,
        String type,
        long accessTokenExpiration,
        long refreshTokenExpiration) {
    public JwtResponse(String token, String refreshToken, long accessTokenExpiration, long refreshTokenExpiration) {
        this(token, refreshToken, "Bearer", accessTokenExpiration, refreshTokenExpiration);
    }
}
