package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ProductUpdateRequest(
        @NotBlank(message = "name is required") String name,

        @NotNull(message = "quantity is required") @Min(value = 1, message = "quantity must be greater than 0") Integer quantity,

        String description,

        @NotBlank(message = "categoryId is required") String categoryId,

        List<String> imageUrls,
        List<AttributeRequest> attributes
) {
}
