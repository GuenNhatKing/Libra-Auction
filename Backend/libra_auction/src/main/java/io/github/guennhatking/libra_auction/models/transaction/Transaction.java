package io.github.guennhatking.libra_auction.models.transaction;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionType;
import io.github.guennhatking.libra_auction.enums.transaction.TransactionStatus;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    private long amount;
    private OffsetDateTime createdAt;

    @Enumerated(EnumType.STRING)
    protected TransactionStatus transactionStatus = TransactionStatus.PROCESSING;

    private String partnerTransactionId;

    // CONSTRUCTOR
    protected Transaction() {
    }

    public Transaction(TransactionType transactionType, long amount) {
        this.transactionType = transactionType;
        this.amount = amount;
        this.createdAt = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public long getAmount() {
        return amount;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public TransactionStatus getTransactionStatus() {
        return transactionStatus;
    }

    public String getPartnerTransactionId() {
        return partnerTransactionId;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setTransactionStatus(TransactionStatus transactionStatus) {
        this.transactionStatus = transactionStatus;
    }

    public void setPartnerTransactionId(String partnerTransactionId) {
        this.partnerTransactionId = partnerTransactionId;
    }

    // ===== Business Logic Methods =====

    /**
     * Mark this transaction as successful with the partner's transaction ID.
     */
    public void markSuccess(String partnerTransactionId) {
        this.transactionStatus = TransactionStatus.SUCCESS;
        this.partnerTransactionId = partnerTransactionId;
    }

    /**
     * Mark this transaction as failed.
     */
    public void markFailed() {
        this.transactionStatus = TransactionStatus.FAILED;
    }
}
