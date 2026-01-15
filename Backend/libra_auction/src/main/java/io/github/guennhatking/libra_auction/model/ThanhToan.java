package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class ThanhToan {
    private String id;
    private String phienDauGiaId;
    private String nguoiTraId;
    private String nguoiNhanId;
    private Long soTien;
    private LocalDateTime thoiGianThanhToan;
    private Integer trangThai;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhienDauGiaId() {
        return phienDauGiaId;
    }

    public void setPhienDauGiaId(String phienDauGiaId) {
        this.phienDauGiaId = phienDauGiaId;
    }

    public String getNguoiTraId() {
        return nguoiTraId;
    }

    public void setNguoiTraId(String nguoiTraId) {
        this.nguoiTraId = nguoiTraId;
    }

    public String getNguoiNhanId() {
        return nguoiNhanId;
    }

    public void setNguoiNhanId(String nguoiNhanId) {
        this.nguoiNhanId = nguoiNhanId;
    }

    public Long getSoTien() {
        return soTien;
    }

    public void setSoTien(Long soTien) {
        this.soTien = soTien;
    }

    public LocalDateTime getThoiGianThanhToan() {
        return thoiGianThanhToan;
    }

    public void setThoiGianThanhToan(LocalDateTime thoiGianThanhToan) {
        this.thoiGianThanhToan = thoiGianThanhToan;
    }

    public Integer getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }
}
