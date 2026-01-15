package io.github.guennhatking.libra_auction.model;

import java.io.Serializable;

public class ThamGiaDauGiaId implements Serializable {
    private String phienDauGiaId;
    private String nguoiThamGiaId;

    public ThamGiaDauGiaId() {
    }

    public ThamGiaDauGiaId(String phienDauGiaId, String nguoiThamGiaId) {
        this.phienDauGiaId = phienDauGiaId;
        this.nguoiThamGiaId = nguoiThamGiaId;
    }

    public String getPhienDauGiaId() {
        return phienDauGiaId;
    }

    public void setPhienDauGiaId(String phienDauGiaId) {
        this.phienDauGiaId = phienDauGiaId;
    }

    public String getNguoiThamGiaId() {
        return nguoiThamGiaId;
    }

    public void setNguoiThamGiaId(String nguoiThamGiaId) {
        this.nguoiThamGiaId = nguoiThamGiaId;
    }
}
