package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class EmailVerificationRequest extends RequestEntity {
    @OneToOne
    private OtpRequest yeuCauOTP;

    // CONSTRUCTOR
    protected EmailVerificationRequest() {
    }

    public EmailVerificationRequest(Customer nguoiYeuCau) {
        super(nguoiYeuCau, RequestType.XAC_THUC_EMAIL);
    }

    // GETTER
    public OtpRequest getYeuCauOTP() {
        return yeuCauOTP;
    }

    // SETTER
    public void setYeuCauOTP(OtpRequest yeuCauOTP) {
        this.yeuCauOTP = yeuCauOTP;
    }
}
