package io.github.guennhatking.libra_auction.models.transaction;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.time.OffsetDateTime;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionType;
import io.github.guennhatking.libra_auction.models.auction.AuctionParticipationInfo;
import io.github.guennhatking.libra_auction.models.person.Customer;

@Entity
public class DepositTransaction extends Transaction {
    @ManyToOne
    private Customer depositor;

    @ManyToOne
    private AuctionParticipationInfo participationInfo;

    private OffsetDateTime refundTime;

    // CONSTRUCTOR
    protected DepositTransaction() {
    }

    public DepositTransaction(long amount, Customer depositor, AuctionParticipationInfo participationInfo) {
        super(TransactionType.DEPOSIT, amount);
        this.depositor = depositor;
        this.participationInfo = participationInfo;
        this.refundTime = null;
    }

    // GETTER
    public Customer getDepositor() {
        return depositor;
    }

    public AuctionParticipationInfo getParticipationInfo() {
        return participationInfo;
    }

    public OffsetDateTime getRefundTime() {
        return refundTime;
    }

    // SETTER
    public void setDepositor(Customer depositor) {
        this.depositor = depositor;
    }

    public void setParticipationInfo(AuctionParticipationInfo participationInfo) {
        this.participationInfo = participationInfo;
    }

    public void setRefundTime(OffsetDateTime refundTime) {
        this.refundTime = refundTime;
    }
}
