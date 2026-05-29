package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.RequestStatus;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CreateAuctionRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Auction auction;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private String rejectionReason;

    // CONSTRUCTOR
    public CreateAuctionRequest() {
    }

    public CreateAuctionRequest(Auction auction) {
        this.auction = auction;
        this.status = RequestStatus.INITIATED;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Auction getAuction() {
        return auction;
    }

    public RequestStatus getStatus() {
        return status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public void setStatus(RequestStatus status) {
        this.status = status;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
