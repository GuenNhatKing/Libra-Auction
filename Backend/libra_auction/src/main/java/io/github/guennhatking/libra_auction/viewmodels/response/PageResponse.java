package io.github.guennhatking.libra_auction.viewmodels.response;

import java.util.List;

public record PageResponse<T>(
        List<T> content,
        Integer totalPages,
        Long totalElements,
        Integer currentPage,
        Integer pageSize,
        Boolean isFirst,
        Boolean isLast) {
}