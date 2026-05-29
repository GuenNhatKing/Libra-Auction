package io.github.guennhatking.libra_auction.models.transaction;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionType;
import io.github.guennhatking.libra_auction.models.auction.AuctionResult;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class PaymentTransaction extends Transaction {
    @ManyToOne
    private Customer sender;

    @ManyToOne
    private Customer receiver;

    @OneToOne
    private AuctionResult auctionResult;

    // CONSTRUCTOR
    protected PaymentTransaction() {
    }

    public PaymentTransaction(long amount, Customer sender, Customer receiver, AuctionResult auctionResult) {
        super(TransactionType.PAYMENT, amount);
        this.sender = sender;
        this.receiver = receiver;
        this.auctionResult = auctionResult;
    }

    // GETTER
    public Customer getSender() {
        return sender;
    }

    public Customer getReceiver() {
        return receiver;
    }

    public AuctionResult getAuctionResult() {
        return auctionResult;
    }

    // SETTER
    public void setSender(Customer sender) {
        this.sender = sender;
    }

    public void setReceiver(Customer receiver) {
        this.receiver = receiver;
    }

    public void setAuctionResult(AuctionResult auctionResult) {
        this.auctionResult = auctionResult;
    }
}
