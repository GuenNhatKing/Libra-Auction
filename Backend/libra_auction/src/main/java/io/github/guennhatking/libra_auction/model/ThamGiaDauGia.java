package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class ThamGiaDauGia {
    private ThamGiaDauGiaId id;
    private LocalDateTime thoiGianDangKy;

    public ThamGiaDauGiaId getId() {
        return id;
    }

    public void setId(ThamGiaDauGiaId id) {
        this.id = id;
    }

    public LocalDateTime getThoiGianDangKy() {
        return thoiGianDangKy;
    }

    public void setThoiGianDangKy(LocalDateTime thoiGianDangKy) {
        this.thoiGianDangKy = thoiGianDangKy;
    }
}
