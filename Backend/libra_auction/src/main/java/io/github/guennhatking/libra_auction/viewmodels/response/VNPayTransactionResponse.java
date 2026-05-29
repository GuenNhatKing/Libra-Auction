package io.github.guennhatking.libra_auction.viewmodels.response;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionStatus;

public record VNPayTransactionResponse(
    String transactionId,
    String vnpayTxnRef,
    long amount,
    String description,
    String detailInfo,
    TransactionStatus status,
    String createdAt
) {}
