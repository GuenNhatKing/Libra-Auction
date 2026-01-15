package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class BanGhiPhienDauGia {
    private String id;
    private String phienDauGiaId;
    private String nguoiTraGiaId;
    private Long giaTra;
    private LocalDateTime thoiGianTra;

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

    public String getNguoiTraGiaId() {
        return nguoiTraGiaId;
    }

    public void setNguoiTraGiaId(String nguoiTraGiaId) {
        this.nguoiTraGiaId = nguoiTraGiaId;
    }

    public Long getGiaTra() {
        return giaTra;
    }

    public void setGiaTra(Long giaTra) {
        this.giaTra = giaTra;
    }

    public LocalDateTime getThoiGianTra() {
        return thoiGianTra;
    }

    public void setThoiGianTra(LocalDateTime thoiGianTra) {
        this.thoiGianTra = thoiGianTra;
    }
}
