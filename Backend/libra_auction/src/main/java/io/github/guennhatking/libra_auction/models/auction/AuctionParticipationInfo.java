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
    private Customer nguoiThamGia;

    @ManyToOne
    private Auction phienDauGia;

    private OffsetDateTime thoiGianDangKy;

    // CONSTRUCTOR
    public AuctionParticipationInfo() {
    }

    public AuctionParticipationInfo(Customer nguoiThamGia, Auction phienDauGia) {
        this.nguoiThamGia = nguoiThamGia;
        this.phienDauGia = phienDauGia;
        this.thoiGianDangKy = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getNguoiThamGia() {
        return nguoiThamGia;
    }

    public Auction getPhienDauGia() {
        return phienDauGia;
    }

    public OffsetDateTime getThoiGianDangKy() {
        return thoiGianDangKy;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setNguoiThamGia(Customer nguoiThamGia) {
        this.nguoiThamGia = nguoiThamGia;
    }

    public void setPhienDauGia(Auction phienDauGia) {
        this.phienDauGia = phienDauGia;
    }

    public void setThoiGianDangKy(OffsetDateTime thoiGianDangKy) {
        this.thoiGianDangKy = thoiGianDangKy;
    }
}
