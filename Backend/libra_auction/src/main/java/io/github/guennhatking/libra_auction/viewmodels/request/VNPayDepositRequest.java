package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;

/**
 * Request tạo thanh toán VNPay
 */
public record VNPayDepositRequest(
        @NotBlank(message = "Phải bao gồm phiên đấu giá Id") String phienDauGiaId) {
}
