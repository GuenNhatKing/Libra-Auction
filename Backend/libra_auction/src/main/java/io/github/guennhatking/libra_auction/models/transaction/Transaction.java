package io.github.guennhatking.libra_auction.models.transaction;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionType;
import io.github.guennhatking.libra_auction.enums.transaction.TransactionStatus;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Enumerated(EnumType.STRING)
    private TransactionType loaiGiaoDich;

    private long soTien;
    private OffsetDateTime ngayTao;

    @Enumerated(EnumType.STRING)
    private TransactionStatus tinhTrangGiaoDich = TransactionStatus.DANG_XU_LY;

    private String maGiaoDichCuaDoiTac; // Lưu lại mã giao dịch của VNPay

    // CONSTRUCTOR
    protected Transaction() {
    }

    public Transaction(TransactionType loaiGiaoDich, long soTien) {
        this.loaiGiaoDich = loaiGiaoDich;
        this.soTien = soTien;
        this.ngayTao = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public TransactionType getLoaiGiaoDich() {
        return loaiGiaoDich;
    }

    public long getSoTien() {
        return soTien;
    }

    public OffsetDateTime getNgayTao() {
        return ngayTao;
    }

    public TransactionStatus getTinhTrangGiaoDich() {
        return tinhTrangGiaoDich;
    }

    public String getMaGiaoDichCuaDoiTac() {
        return maGiaoDichCuaDoiTac;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setLoaiGiaoDich(TransactionType loaiGiaoDich) {
        this.loaiGiaoDich = loaiGiaoDich;
    }

    public void setSoTien(long soTien) {
        this.soTien = soTien;
    }

    public void setNgayTao(OffsetDateTime ngayTao) {
        this.ngayTao = ngayTao;
    }

    public void setTinhTrangGiaoDich(TransactionStatus tinhTrangGiaoDich) {
        this.tinhTrangGiaoDich = tinhTrangGiaoDich;
    }

    public void setMaGiaoDichCuaDoiTac(String maGiaoDichCuaDoiTac) {
        this.maGiaoDichCuaDoiTac = maGiaoDichCuaDoiTac;
    }
}