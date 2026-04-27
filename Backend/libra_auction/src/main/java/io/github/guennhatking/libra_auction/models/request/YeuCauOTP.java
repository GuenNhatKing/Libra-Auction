package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.LoaiYeuCau;
import io.github.guennhatking.libra_auction.models.person.NguoiDung;
import jakarta.persistence.Entity;

@Entity
public class YeuCauOTP extends YeuCau {
    private String maOTPDaTao;
    private String maOTPNguoiDungNhap;

    // CONSTRUCTOR
    protected YeuCauOTP() {
    }

    public YeuCauOTP(NguoiDung nguoiYeuCau) {
        super(nguoiYeuCau, LoaiYeuCau.OTP);
    }

    // GETTER
    public String getMaOTPDaTao() {
        return maOTPDaTao;
    }

    public String getMaOTPNguoiDungNhap() {
        return maOTPNguoiDungNhap;
    }

    // SETTER
    public void setMaOTPDaTao(String maOTPDaTao) {
        this.maOTPDaTao = maOTPDaTao;
    }

    public void setMaOTPNguoiDungNhap(String maOTPNguoiDungNhap) {
        this.maOTPNguoiDungNhap = maOTPNguoiDungNhap;
    }
}
