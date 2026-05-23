package io.github.guennhatking.libra_auction.models.qa;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import io.github.guennhatking.libra_auction.enums.qa.QuestionStatus;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Auction phienDauGia;

    @ManyToOne
    private Customer nguoiHoi;

    @ManyToOne
    private Customer nguoiTraLoi;

    private String noiDungHoi;
    private String noiDungTraLoi;
    private OffsetDateTime thoiGianHoi;
    private OffsetDateTime thoiGianTraLoi;

    @Enumerated(EnumType.STRING)
    private QuestionStatus tinhTrangCauHoi;

    // CONSTRUCTOR
    public Question() {
    }

    public Question(Auction phienDauGia, Customer nguoiHoi, String noiDungHoi) {
        this.phienDauGia = phienDauGia;
        this.nguoiHoi = nguoiHoi;
        this.noiDungHoi = noiDungHoi;
        this.thoiGianHoi = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Auction getPhienDauGia() {
        return phienDauGia;
    }

    public Customer getNguoiHoi() {
        return nguoiHoi;
    }

    public Customer getNguoiTraLoi() {
        return nguoiTraLoi;
    }

    public String getNoiDungHoi() {
        return noiDungHoi;
    }

    public String getNoiDungTraLoi() {
        return noiDungTraLoi;
    }

    public OffsetDateTime getThoiGianHoi() {
        return thoiGianHoi;
    }

    public OffsetDateTime getThoiGianTraLoi() {
        return thoiGianTraLoi;
    }

    public QuestionStatus getTinhTrangCauHoi() {
        return tinhTrangCauHoi;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setPhienDauGia(Auction phienDauGia) {
        this.phienDauGia = phienDauGia;
    }

    public void setNguoiHoi(Customer nguoiHoi) {
        this.nguoiHoi = nguoiHoi;
    }

    public void setNguoiTraLoi(Customer nguoiTraLoi) {
        this.nguoiTraLoi = nguoiTraLoi;
    }

    public void setNoiDungHoi(String noiDungHoi) {
        this.noiDungHoi = noiDungHoi;
    }

    public void setNoiDungTraLoi(String noiDungTraLoi) {
        this.noiDungTraLoi = noiDungTraLoi;
    }

    public void setThoiGianHoi(OffsetDateTime thoiGianHoi) {
        this.thoiGianHoi = thoiGianHoi;
    }

    public void setThoiGianTraLoi(OffsetDateTime thoiGianTraLoi) {
        this.thoiGianTraLoi = thoiGianTraLoi;
    }

    public void setTinhTrangCauHoi(QuestionStatus tinhTrangCauHoi) {
        this.tinhTrangCauHoi = tinhTrangCauHoi;
    }
}