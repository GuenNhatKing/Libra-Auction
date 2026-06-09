package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.RequestStatus;
import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class EmailVerificationRequest extends RequestEntity {
    @OneToOne
    private OtpRequest otpRequest;

    // CONSTRUCTOR
    protected EmailVerificationRequest() {
    }

    public EmailVerificationRequest(Customer customer) {
        super(customer, RequestType.EMAIL_VERIFICATION);
    }

    // GETTER
    public OtpRequest getOtpRequest() {
        return otpRequest;
    }

    // SETTER
    public void setOtpRequest(OtpRequest otpRequest) {
        this.otpRequest = otpRequest;
    }

    // BUSINESS LOGIC

    @Override
    public void activate() {
        if (this.otpRequest == null || this.otpRequest.getRequestStatus() != RequestStatus.ACTIVATED) {
            throw new IllegalStateException("OTP has not been activated yet.");
        }
        super.activate();
    }
}
