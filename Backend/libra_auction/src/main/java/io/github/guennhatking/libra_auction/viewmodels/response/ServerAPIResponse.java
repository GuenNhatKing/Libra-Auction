package io.github.guennhatking.libra_auction.viewmodels.response;

public record ServerAPIResponse<T>(boolean isSuccess, String errorMessage, T data) {

    // Constructor cho trường hợp thất bại
    public static <T> ServerAPIResponse<T> error(String errorMessage) {
        System.out.println("errorMessage: " + errorMessage); // In ra dữ liệu để kiểm tra
        return new ServerAPIResponse<>(false, errorMessage, null);
    }

    // Constructor cho trường hợp thành công
    public static <T> ServerAPIResponse<T> success(T data) {
        if (data != null) {
            System.out.println("Type of data: " + data.getClass().getSimpleName()); // In ra dữ liệu để kiểm tra
            System.out.println("Data: " + data); // In ra dữ liệu để kiểm tra
        }
        return new ServerAPIResponse<>(true, null, data);
    }
}
