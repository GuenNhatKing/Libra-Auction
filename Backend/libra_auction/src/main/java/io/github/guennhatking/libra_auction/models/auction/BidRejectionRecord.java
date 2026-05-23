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
    private Customer nguoiBoCuoc;

    @ManyToOne
    private Auction phienDauGia;

    private OffsetDateTime thoiGian;
    private String lyDo;

    // CONSTRUCTOR
    public BidRejectionRecord() {
    }

    public BidRejectionRecord(Customer nguoiBoCuoc, Auction phienDauGia, String lyDo) {
        this.nguoiBoCuoc = nguoiBoCuoc;
        this.phienDauGia = phienDauGia;
        this.thoiGian = OffsetDateTime.now(ZoneOffset.ofHours(7));
        this.lyDo = lyDo;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getNguoiBoCuoc() {
        return nguoiBoCuoc;
    }

    public Auction getPhienDauGia() {
        return phienDauGia;
    }

    public OffsetDateTime getThoiGian() {
        return thoiGian;
    }

    public String getLyDo() {
        return lyDo;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setNguoiBoCuoc(Customer nguoiBoCuoc) {
        this.nguoiBoCuoc = nguoiBoCuoc;
    }

    public void setPhienDauGia(Auction phienDauGia) {
        this.phienDauGia = phienDauGia;
    }

    public void setThoiGian(OffsetDateTime thoiGian) {
        this.thoiGian = thoiGian;
    }

    public void setLyDo(String lyDo) {
        this.lyDo = lyDo;
    }
}
