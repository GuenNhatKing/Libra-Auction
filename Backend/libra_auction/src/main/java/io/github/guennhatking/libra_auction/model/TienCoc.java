package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class TienCoc {
    private String id;
    private String nguoiThamGiaId;
    private Long soTien;
    private String trangThai;
    private LocalDateTime thoiGianThanhToan;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNguoiThamGiaId() {
        return nguoiThamGiaId;
    }

    public void setNguoiThamGiaId(String nguoiThamGiaId) {
        this.nguoiThamGiaId = nguoiThamGiaId;
    }

    public Long getSoTien() {
        return soTien;
    }

    public void setSoTien(Long soTien) {
        this.soTien = soTien;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public LocalDateTime getThoiGianThanhToan() {
        return thoiGianThanhToan;
    }

    public void setThoiGianThanhToan(LocalDateTime thoiGianThanhToan) {
        this.thoiGianThanhToan = thoiGianThanhToan;
    }
}
