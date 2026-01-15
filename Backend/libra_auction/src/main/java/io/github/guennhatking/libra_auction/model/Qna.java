package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

public class Qna {
    private String id;
    private String phienDauGiaId;
    private String nguoiHoiId;
    private String nguoiTraLoiId;
    private String noiDungHoi;
    private String noiDungTraLoi;
    private LocalDateTime thoiGianHoi;
    private LocalDateTime thoiGianTraLoi;
    private String trangThaiQna;

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

    public String getNguoiHoiId() {
        return nguoiHoiId;
    }

    public void setNguoiHoiId(String nguoiHoiId) {
        this.nguoiHoiId = nguoiHoiId;
    }

    public String getNguoiTraLoiId() {
        return nguoiTraLoiId;
    }

    public void setNguoiTraLoiId(String nguoiTraLoiId) {
        this.nguoiTraLoiId = nguoiTraLoiId;
    }

    public String getNoiDungHoi() {
        return noiDungHoi;
    }

    public void setNoiDungHoi(String noiDungHoi) {
        this.noiDungHoi = noiDungHoi;
    }

    public String getNoiDungTraLoi() {
        return noiDungTraLoi;
    }

    public void setNoiDungTraLoi(String noiDungTraLoi) {
        this.noiDungTraLoi = noiDungTraLoi;
    }

    public LocalDateTime getThoiGianHoi() {
        return thoiGianHoi;
    }

    public void setThoiGianHoi(LocalDateTime thoiGianHoi) {
        this.thoiGianHoi = thoiGianHoi;
    }

    public LocalDateTime getThoiGianTraLoi() {
        return thoiGianTraLoi;
    }

    public void setThoiGianTraLoi(LocalDateTime thoiGianTraLoi) {
        this.thoiGianTraLoi = thoiGianTraLoi;
    }

    public String getTrangThaiQna() {
        return trangThaiQna;
    }

    public void setTrangThaiQna(String trangThaiQna) {
        this.trangThaiQna = trangThaiQna;
    }
}
