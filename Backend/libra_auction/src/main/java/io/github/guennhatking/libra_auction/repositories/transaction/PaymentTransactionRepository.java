package io.github.guennhatking.libra_auction.repositories.transaction;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.enums.transaction.TransactionStatus;
import io.github.guennhatking.libra_auction.models.transaction.PaymentTransaction;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, String> {
    List<PaymentTransaction> findBySender_IdOrderByCreatedAtDesc(String senderId);

    List<PaymentTransaction> findByReceiver_IdOrderByCreatedAtDesc(String receiverId);

    Optional<PaymentTransaction> findByAuctionResult_IdAndSender_IdAndTransactionStatus(
            String auctionResultId,
            String senderId,
            TransactionStatus transactionStatus);

    List<PaymentTransaction> findAllByOrderByCreatedAtDesc();
}
