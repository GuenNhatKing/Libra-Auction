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
public class BidRejectionRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Customer bidder;

    @ManyToOne
    private Auction auction;

    private OffsetDateTime timestamp;
    private String reason;

    // CONSTRUCTOR
    public BidRejectionRecord() {
    }

    public BidRejectionRecord(Customer bidder, Auction auction, String reason) {
        this.bidder = bidder;
        this.auction = auction;
        this.timestamp = OffsetDateTime.now(ZoneOffset.ofHours(7));
        this.reason = reason;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getBidder() {
        return bidder;
    }

    public Auction getAuction() {
        return auction;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public String getReason() {
        return reason;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setBidder(Customer bidder) {
        this.bidder = bidder;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
