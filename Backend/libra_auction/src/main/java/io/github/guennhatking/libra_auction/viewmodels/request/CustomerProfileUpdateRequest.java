package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CustomerProfileUpdateRequest(
        @NotBlank(message = "Full name is required")
        @Size(min = 2, max = 100)
        String fullName,

        @Size(max = 20)
        String phoneNumber,

        @Size(max = 20)
        String identityNumber,

        @Size(max = 500)
        String avatarUrl) {
}
