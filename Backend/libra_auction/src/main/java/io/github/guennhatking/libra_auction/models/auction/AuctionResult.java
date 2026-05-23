package io.github.guennhatking.libra_auction.models.auction;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.transaction.PaymentTransaction;
import jakarta.persistence.Entity;
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

    @OneToOne
    private Auction phienDauGia;

    @ManyToOne
    private Customer nguoiThangDauGia;

    @OneToOne(mappedBy = "ketQuaDauGia")
    private PaymentTransaction giaoDichThanhToan;

    private OffsetDateTime thoiGianKetThuc;
    private long giaTrungDauGia;

    // CONSTRUCTOR
    public AuctionResult() {
    }

    public AuctionResult(Auction phienDauGia, Customer nguoiThangDauGia, long giaTrungDauGia) {
        this.phienDauGia = phienDauGia;
        this.nguoiThangDauGia = nguoiThangDauGia;
        this.giaTrungDauGia = giaTrungDauGia;
        this.thoiGianKetThuc = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Auction getPhienDauGia() {
        return phienDauGia;
    }

    public Customer getNguoiThangDauGia() {
        return nguoiThangDauGia;
    }

    public OffsetDateTime getThoiGianKetThuc() {
        return thoiGianKetThuc;
    }

    public long getGiaTrungDauGia() {
        return giaTrungDauGia;
    }

    public PaymentTransaction getGiaoDichThanhToan() {
        return giaoDichThanhToan;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setPhienDauGia(Auction phienDauGia) {
        this.phienDauGia = phienDauGia;
    }

    public void setNguoiThangDauGia(Customer nguoiThangDauGia) {
        this.nguoiThangDauGia = nguoiThangDauGia;
    }

    public void setThoiGianKetThuc(OffsetDateTime thoiGianKetThuc) {
        this.thoiGianKetThuc = thoiGianKetThuc;
    }

    public void setGiaTrungDauGia(long giaTrungDauGia) {
        this.giaTrungDauGia = giaTrungDauGia;
    }
}
