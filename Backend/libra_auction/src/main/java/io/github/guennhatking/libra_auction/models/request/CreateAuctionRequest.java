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
    private Auction phienDauGia;

    @Enumerated(EnumType.STRING)
    private RequestStatus trangThai;

    private String liDoTuChoi;

    // CONSTRUCTOR
    public CreateAuctionRequest() {
    }

    public CreateAuctionRequest(Auction phienDauGia) {
        this.phienDauGia = phienDauGia;
        this.trangThai = RequestStatus.KHOI_TAO;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Auction getPhienDauGia() {
        return phienDauGia;
    }

    public RequestStatus getTrangThai() {
        return trangThai;
    }

    public String getLiDoTuChoi() {
        return liDoTuChoi;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setPhienDauGia(Auction phienDauGia) {
        this.phienDauGia = phienDauGia;
    }

    public void setTrangThai(RequestStatus trangThai) {
        this.trangThai = trangThai;
    }

    public void setLiDoTuChoi(String liDoTuChoi) {
        this.liDoTuChoi = liDoTuChoi;
    }
}
