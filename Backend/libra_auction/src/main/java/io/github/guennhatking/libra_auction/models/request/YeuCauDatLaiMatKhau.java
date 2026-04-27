package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.LoaiYeuCau;
import io.github.guennhatking.libra_auction.models.person.NguoiDung;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class YeuCauDatLaiMatKhau extends YeuCau {
    @OneToOne
    private YeuCauOTP yeuCauOTP;

    private String matKhauMoi;

    // CONSTRUCTOR
    protected YeuCauDatLaiMatKhau() {
    }

    public YeuCauDatLaiMatKhau(NguoiDung nguoiYeuCau) {
        super(nguoiYeuCau, LoaiYeuCau.QUEN_MAT_KHAU);
    }

    // GETTER
    public YeuCauOTP getYeuCauOTP() {
        return yeuCauOTP;
    }

    public String getMatKhauMoi() {
        return matKhauMoi;
    }

    // SETTER
    public void setYeuCauOTP(YeuCauOTP yeuCauOTP) {
        this.yeuCauOTP = yeuCauOTP;
    }

    public void setMatKhauMoi(String matKhauMoi) {
        this.matKhauMoi = matKhauMoi;
    }
}
