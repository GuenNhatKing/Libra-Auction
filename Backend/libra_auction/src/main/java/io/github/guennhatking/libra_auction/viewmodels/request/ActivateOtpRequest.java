package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;

public record ActivateOtpRequest(
    @NotBlank(message = "Mã OTP không được để trống.")
    String otp
) {}
