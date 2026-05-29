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
public class AuctionParticipationInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Customer participant;

    @ManyToOne
    private Auction auction;

    private OffsetDateTime registeredAt;

    // CONSTRUCTOR
    public AuctionParticipationInfo() {
    }

    public AuctionParticipationInfo(Customer participant, Auction auction) {
        this.participant = participant;
        this.auction = auction;
        this.registeredAt = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getParticipant() {
        return participant;
    }

    public Auction getAuction() {
        return auction;
    }

    public OffsetDateTime getRegisteredAt() {
        return registeredAt;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setParticipant(Customer participant) {
        this.participant = participant;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public void setRegisteredAt(OffsetDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }
}
