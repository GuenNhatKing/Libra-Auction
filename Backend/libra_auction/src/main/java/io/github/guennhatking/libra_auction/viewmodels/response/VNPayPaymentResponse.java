package io.github.guennhatking.libra_auction.viewmodels.response;

/**
 * Response từ VNPay - chứa URL để redirect người dùng thanh toán
 */
public record VNPayPaymentResponse(
        String paymentUrl) {
}
