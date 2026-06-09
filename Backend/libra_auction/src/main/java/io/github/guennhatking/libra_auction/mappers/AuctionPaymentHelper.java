package io.github.guennhatking.libra_auction.mappers;

import org.springframework.stereotype.Component;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionStatus;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.auction.AuctionResult;
import io.github.guennhatking.libra_auction.repositories.transaction.PaymentTransactionRepository;

@Component
public class AuctionPaymentHelper {

    private final PaymentTransactionRepository paymentTransactionRepository;

    public AuctionPaymentHelper(PaymentTransactionRepository paymentTransactionRepository) {
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    public boolean isWinnerPaymentCompleted(Auction auction) {
        AuctionResult result = auction.getAuctionResult();
        if (result == null || result.getWinner() == null) {
            return false;
        }
        return paymentTransactionRepository
                .findByAuctionResult_IdAndSender_IdAndTransactionStatus(
                        result.getId(),
                        result.getWinner().getId(),
                        TransactionStatus.SUCCESS)
                .isPresent();
    }
}
