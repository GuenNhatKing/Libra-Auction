package io.github.guennhatking.libra_auction.viewmodels.response;

public record ServerAPIResponse<T>(boolean isSuccess, String errorMessage, T data) {

    public static <T> ServerAPIResponse<T> error(String errorMessage) {
        return new ServerAPIResponse<>(false, errorMessage, null);
    }

    public static <T> ServerAPIResponse<T> success(T data) {
        return new ServerAPIResponse<>(true, null, data);
    }
}
