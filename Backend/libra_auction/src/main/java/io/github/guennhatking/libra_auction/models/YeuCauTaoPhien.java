package io.github.guennhatking.libra_auction.models;

public class YeuCauTaoPhien {
    private PhienDauGia phienDauGia;
    private String trangThai; // "chưa kiểm duyệt" | "đã chấp nhận" | "đã từ chối"
    private String liDoTuChoi;

    public PhienDauGia getPhienDauGia() { return null; }
    public String getTrangThai() { return null; }
    public void chapNhanYeuCau() {}
    public void tuChoiYeuCau(String lyDo) {}

    //setter
    public void setPhienDauGia(PhienDauGia phienDauGia) { this.phienDauGia = phienDauGia; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai;}
    public void setLiDoTuChoi(String liDoTuChoi) { this.liDoTuChoi = liDoTuChoi; }
}
