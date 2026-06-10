package io.github.guennhatking.libra_auction.models.auction;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.transaction.PaymentTransaction;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class AuctionResult {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    private Auction auction;

    @ManyToOne
    private Customer winner;

    @OneToOne(mappedBy = "auctionResult")
    private PaymentTransaction paymentTransaction;

    private OffsetDateTime endTime;
    private long winningPrice;

    // CONSTRUCTOR
    public AuctionResult() {
    }

    public AuctionResult(Auction auction, Customer winner, long winningPrice) {
        this.auction = auction;
        this.winner = winner;
        this.winningPrice = winningPrice;
        this.endTime = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Auction getAuction() {
        return auction;
    }

    public Customer getWinner() {
        return winner;
    }

    public OffsetDateTime getEndTime() {
        return endTime;
    }

    public long getWinningPrice() {
        return winningPrice;
    }

    public PaymentTransaction getPaymentTransaction() {
        return paymentTransaction;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public void setWinner(Customer winner) {
        this.winner = winner;
    }

    public void setEndTime(OffsetDateTime endTime) {
        this.endTime = endTime;
    }

    public void setWinningPrice(long winningPrice) {
        this.winningPrice = winningPrice;
    }

    // ===== Business Logic Methods =====

    /**
     * Record the winner and winning price for this auction result.
     */
    public void recordWinner(Customer winner, long winningPrice) {
        this.winner = winner;
        this.winningPrice = winningPrice;
    }
}
