package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;

@Entity
public class OtpRequest extends RequestEntity {
    private String maOTPDaTao;
    private String maOTPNguoiDungNhap;

    // CONSTRUCTOR
    protected OtpRequest() {
    }

    public OtpRequest(Customer nguoiYeuCau) {
        super(nguoiYeuCau, RequestType.OTP);
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
