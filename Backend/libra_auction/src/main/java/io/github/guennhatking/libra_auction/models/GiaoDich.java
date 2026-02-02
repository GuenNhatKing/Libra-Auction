package io.github.guennhatking.libra_auction.models;

public class GiaoDich {
    private String id; // string(10)
    private String loaiGiaoDich; // "thanh toán" | "đặt cọc"
    private long soTien;
    private java.time.LocalDateTime ngayTao;

    //getter setter    
    public String getId() { return id; }
    public String getLoaiGiaoDich() { return loaiGiaoDich; }
    public long getSoTien() { return soTien; }
    public java.time.LocalDateTime getNgayTao() { return ngayTao; }

    public void setId(String id) { this.id = id; }
    public void setLoaiGiaoDich(String loaiGiaoDich) { this.loaiGiaoDich = loaiGiaoDich; }
    public void setSoTien(long soTien) { this.soTien = soTien; }
    public void setNgayTao(java.time.LocalDateTime ngayTao) { this.ngayTao = ngayTao; }

    //tạo chức năng giao dịch ở đây
    public void taoGiaoDich(String id, String loaiGiaoDich, long soTien) {
        this.id = id;
        this.loaiGiaoDich = loaiGiaoDich;
        this.soTien = soTien;
        this.ngayTao = java.time.LocalDateTime.now();
    }

    
}