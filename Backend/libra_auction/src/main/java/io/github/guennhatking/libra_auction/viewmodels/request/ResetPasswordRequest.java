package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(
    @NotBlank(message = "New password is required.")
    @Size(min = 6, message = "INVALID_PASSWORD")
    String newPassword
) {}
