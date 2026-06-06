package io.github.guennhatking.libra_auction.repositories.transaction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.transaction.PaymentTransaction;

public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, String> {
    List<PaymentTransaction> findBySender_IdOrderByCreatedAtDesc(String senderId);

    List<PaymentTransaction> findByReceiver_IdOrderByCreatedAtDesc(String receiverId);
}
