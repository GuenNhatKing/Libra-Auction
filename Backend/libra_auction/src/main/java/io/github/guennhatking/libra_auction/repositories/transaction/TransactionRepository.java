package io.github.guennhatking.libra_auction.repositories.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.transaction.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}
