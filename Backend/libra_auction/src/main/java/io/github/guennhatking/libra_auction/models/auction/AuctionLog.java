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
    private Auction phienDauGia;

    @ManyToOne
    private Customer nguoiDatGia;

    private OffsetDateTime thoiGian;
    private long mucGia;

    // CONSTRUCTOR
    public AuctionLog() {
    }

    public AuctionLog(Auction phienDauGia, Customer nguoiDatGia, long mucGia) {
        this.phienDauGia = phienDauGia;
        this.nguoiDatGia = nguoiDatGia;
        this.mucGia = mucGia;
        this.thoiGian = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Auction getPhienDauGia() {
        return phienDauGia;
    }

    public Customer getNguoiDatGia() {
        return nguoiDatGia;
    }

    public OffsetDateTime getThoiGian() {
        return thoiGian;
    }

    public long getMucGia() {
        return mucGia;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setPhienDauGia(Auction phienDauGia) {
        this.phienDauGia = phienDauGia;
    }

    public void setNguoiDatGia(Customer nguoiDatGia) {
        this.nguoiDatGia = nguoiDatGia;
    }

    public void setThoiGian(OffsetDateTime thoiGian) {
        this.thoiGian = thoiGian;
    }

    public void setMucGia(long mucGia) {
        this.mucGia = mucGia;
    }
}