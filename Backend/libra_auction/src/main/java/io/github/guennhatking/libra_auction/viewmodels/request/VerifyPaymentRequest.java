package io.github.guennhatking.libra_auction.viewmodels.request;

public record VerifyPaymentRequest(
    String vnp_Amount,
    String vnp_BankCode,
    String vnp_BankTranNo,
    String vnp_CardType,
    String vnp_OrderInfo,
    String vnp_PayDate,
    String vnp_ResponseCode,
    String vnp_TmnCode,
    String vnp_TransactionNo,
    String vnp_TransactionStatus,
    String vnp_TxnRef,
    String vnp_SecureHash
) {
    public long getActualAmount() {
        return Long.parseLong(vnp_Amount) / 100;
    }

    public boolean isSuccess() {
        return "00".equals(vnp_ResponseCode) && "00".equals(vnp_TransactionStatus);
    }
}