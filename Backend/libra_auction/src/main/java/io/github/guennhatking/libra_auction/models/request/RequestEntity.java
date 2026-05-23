package io.github.guennhatking.libra_auction.models.request;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;

import java.time.OffsetDateTime;

import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.enums.request.RequestStatus;
import io.github.guennhatking.libra_auction.models.notification.ThongBao;
import io.github.guennhatking.libra_auction.models.person.Customer;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class RequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected String id;

    @ManyToOne
    protected Customer nguoiDung;

    @ManyToOne
    protected ThongBao thongBao;

    protected String token;

    @Enumerated(EnumType.STRING)
    protected RequestType loaiYeuCau;

    @Enumerated(EnumType.STRING)
    protected RequestStatus trangThaiYeuCau;

    protected OffsetDateTime thoiGianHetHanKichHoat;
    protected OffsetDateTime thoiGianHetHanSuDung;

    // CONSTRUCTOR
    protected RequestEntity() {
    }

    public RequestEntity(Customer nguoiDung, RequestType loaiYeuCau) {
        this.nguoiDung = nguoiDung;
        this.loaiYeuCau = loaiYeuCau;
        this.trangThaiYeuCau = RequestStatus.KHOI_TAO;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getNguoiDung() {
        return nguoiDung;
    }

    public ThongBao getThongBao() {
        return thongBao;
    }

    public String getToken() {
        return token;
    }

    public RequestType getLoaiYeuCau() {
        return loaiYeuCau;
    }

    public RequestStatus getTrangThaiYeuCau() {
        return trangThaiYeuCau;
    }

    public OffsetDateTime getThoiGianHetHanKichHoat() {
        return thoiGianHetHanKichHoat;
    }

    public OffsetDateTime getThoiGianHetHanSuDung() {
        return thoiGianHetHanSuDung;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setNguoiDung(Customer nguoiDung) {
        this.nguoiDung = nguoiDung;
    }

    public void setThongBao(ThongBao thongBao) {
        this.thongBao = thongBao;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setLoaiYeuCau(RequestType loaiYeuCau) {
        this.loaiYeuCau = loaiYeuCau;
    }

    public void setTrangThaiYeuCau(RequestStatus trangThaiYeuCau) {
        this.trangThaiYeuCau = trangThaiYeuCau;
    }

    public void setThoiGianHetHanKichHoat(OffsetDateTime thoiGianHetHanKichHoat) {
        this.thoiGianHetHanKichHoat = thoiGianHetHanKichHoat;
    }

    public void setThoiGianHetHanSuDung(OffsetDateTime thoiGianHetHanSuDung) {
        this.thoiGianHetHanSuDung = thoiGianHetHanSuDung;
    }
}
