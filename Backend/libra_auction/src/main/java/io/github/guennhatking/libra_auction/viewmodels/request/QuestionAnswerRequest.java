package io.github.guennhatking.libra_auction.viewmodels.request;

import jakarta.validation.constraints.NotBlank;

public record QuestionAnswerRequest(
        @NotBlank(message = "content is required") String content
) {
}
