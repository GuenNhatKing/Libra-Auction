package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;

public record ActivateOtpRequest(
    @NotBlank(message = "OTP is required.")
    String otp
) {}
