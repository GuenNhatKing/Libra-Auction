package io.github.guennhatking.libra_auction.viewmodels.response;

public record ServerAPIResponse<T>(boolean isSuccess, String errorMessage, T data) {
    
    // Constructor cho trường hợp thất bại
    public static <T> ServerAPIResponse<T> error(String errorMessage) {
        return new ServerAPIResponse<>(false, errorMessage, null);
    }

    // Constructor cho trường hợp thành công
    public static <T> ServerAPIResponse<T> success(T data) {
        return new ServerAPIResponse<>(true, null, data);
    }
}
