package io.github.guennhatking.libra_auction.viewmodels.response;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionStatus;
import io.github.guennhatking.libra_auction.enums.transaction.TransactionType;

public record UserTransactionResponse(
        String transactionId,
        String vnpayTxnRef,
        long amount,
        String description,
        String detailInfo,
        TransactionStatus status,
        String createdAt,
        TransactionType transactionType,
        boolean incoming) {
}
