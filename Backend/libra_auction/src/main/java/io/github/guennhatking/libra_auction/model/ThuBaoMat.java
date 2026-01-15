package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class ThuBaoMat {
    private String id;
    private String thuId;
    private String token;
    private Integer yeuCau;
    private LocalDateTime thoiGianHetHan;
    private Integer trangThai;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getThuId() {
        return thuId;
    }

    public void setThuId(String thuId) {
        this.thuId = thuId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getYeuCau() {
        return yeuCau;
    }

    public void setYeuCau(Integer yeuCau) {
        this.yeuCau = yeuCau;
    }

    public LocalDateTime getThoiGianHetHan() {
        return thoiGianHetHan;
    }

    public void setThoiGianHetHan(LocalDateTime thoiGianHetHan) {
        this.thoiGianHetHan = thoiGianHetHan;
    }

    public Integer getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }
}

