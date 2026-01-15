package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class KetQuaDauGia {
    private String phienDauGiaId;
    private String nguoiThangDauGiaId;
    private LocalDateTime thoiGianKetThuc;
    private Long giaTrungDauGia;

    public String getPhienDauGiaId() {
        return phienDauGiaId;
    }

    public void setPhienDauGiaId(String phienDauGiaId) {
        this.phienDauGiaId = phienDauGiaId;
    }

    public String getNguoiThangDauGiaId() {
        return nguoiThangDauGiaId;
    }

    public void setNguoiThangDauGiaId(String nguoiThangDauGiaId) {
        this.nguoiThangDauGiaId = nguoiThangDauGiaId;
    }

    public LocalDateTime getThoiGianKetThuc() {
        return thoiGianKetThuc;
    }

    public void setThoiGianKetThuc(LocalDateTime thoiGianKetThuc) {
        this.thoiGianKetThuc = thoiGianKetThuc;
    }

    public Long getGiaTrungDauGia() {
        return giaTrungDauGia;
    }

    public void setGiaTrungDauGia(Long giaTrungDauGia) {
        this.giaTrungDauGia = giaTrungDauGia;
    }
}

