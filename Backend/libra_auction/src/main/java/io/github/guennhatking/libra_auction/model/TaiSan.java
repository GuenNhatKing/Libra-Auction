package io.github.guennhatking.libra_auction.model;

public class TaiSan {
    private String id;
    private String phienDauGiaId;
    private String tenTaiSan;
    private Integer soLuong;
    private String moTa;
    private Boolean daBan;
    private String danhMucId;

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

    public String getTenTaiSan() {
        return tenTaiSan;
    }

    public void setTenTaiSan(String tenTaiSan) {
        this.tenTaiSan = tenTaiSan;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public Boolean getDaBan() {
        return daBan;
    }

    public void setDaBan(Boolean daBan) {
        this.daBan = daBan;
    }

    public String getDanhMucId() {
        return danhMucId;
    }

    public void setDanhMucId(String danhMucId) {
        this.danhMucId = danhMucId;
    }
}

