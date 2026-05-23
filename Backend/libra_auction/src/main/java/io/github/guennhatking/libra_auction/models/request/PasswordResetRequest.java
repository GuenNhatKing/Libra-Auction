package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class PasswordResetRequest extends RequestEntity {
    @OneToOne
    private OtpRequest yeuCauOTP;

    private String matKhauMoi;

    // CONSTRUCTOR
    protected PasswordResetRequest() {
    }

    public PasswordResetRequest(Customer nguoiYeuCau) {
        super(nguoiYeuCau, RequestType.QUEN_MAT_KHAU);
    }

    // GETTER
    public OtpRequest getYeuCauOTP() {
        return yeuCauOTP;
    }

    public String getMatKhauMoi() {
        return matKhauMoi;
    }

    // SETTER
    public void setYeuCauOTP(OtpRequest yeuCauOTP) {
        this.yeuCauOTP = yeuCauOTP;
    }

    public void setMatKhauMoi(String matKhauMoi) {
        this.matKhauMoi = matKhauMoi;
    }
}
