package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class PhienDauGia {
    private String id;
    private LocalDateTime thoiGianBatDau;
    private LocalDateTime thoiGianKetThuc;
    private String trangThaiPhien;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDateTime getThoiGianBatDau() {
        return thoiGianBatDau;
    }

    public void setThoiGianBatDau(LocalDateTime thoiGianBatDau) {
        this.thoiGianBatDau = thoiGianBatDau;
    }

    public LocalDateTime getThoiGianKetThuc() {
        return thoiGianKetThuc;
    }

    public void setThoiGianKetThuc(LocalDateTime thoiGianKetThuc) {
        this.thoiGianKetThuc = thoiGianKetThuc;
    }

    public String getTrangThaiPhien() {
        return trangThaiPhien;
    }

    public void setTrangThaiPhien(String trangThaiPhien) {
        this.trangThaiPhien = trangThaiPhien;
    }
}

