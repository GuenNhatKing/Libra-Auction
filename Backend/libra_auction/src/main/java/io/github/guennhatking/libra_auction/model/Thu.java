package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class Thu {
    private String id;
    private String nguoiGuiId;
    private String nguoiNhanId;
    private String noiDung;
    private Integer phuongThuc;
    private LocalDateTime thoiGianGui;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNguoiGuiId() {
        return nguoiGuiId;
    }

    public void setNguoiGuiId(String nguoiGuiId) {
        this.nguoiGuiId = nguoiGuiId;
    }

    public String getNguoiNhanId() {
        return nguoiNhanId;
    }

    public void setNguoiNhanId(String nguoiNhanId) {
        this.nguoiNhanId = nguoiNhanId;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public Integer getPhuongThuc() {
        return phuongThuc;
    }

    public void setPhuongThuc(Integer phuongThuc) {
        this.phuongThuc = phuongThuc;
    }

    public LocalDateTime getThoiGianGui() {
        return thoiGianGui;
    }

    public void setThoiGianGui(LocalDateTime thoiGianGui) {
        this.thoiGianGui = thoiGianGui;
    }
}
