package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;

public record SigninFormRequest(
        @NotBlank(message = "Username cannot be left blank.") String username,
        @NotBlank(message = "Password cannot be left blank.") String password) {
}