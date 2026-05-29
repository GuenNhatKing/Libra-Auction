package io.github.guennhatking.libra_auction.models.auction;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class AuctionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Auction auction;

    @ManyToOne
    private Customer bidder;

    private OffsetDateTime timestamp;
    private long bidAmount;

    // CONSTRUCTOR
    public AuctionLog() {
    }

    public AuctionLog(Auction auction, Customer bidder, long bidAmount) {
        this.auction = auction;
        this.bidder = bidder;
        this.bidAmount = bidAmount;
        this.timestamp = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Auction getAuction() {
        return auction;
    }

    public Customer getBidder() {
        return bidder;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public long getBidAmount() {
        return bidAmount;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public void setBidder(Customer bidder) {
        this.bidder = bidder;
    }

    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setBidAmount(long bidAmount) {
        this.bidAmount = bidAmount;
    }
}
