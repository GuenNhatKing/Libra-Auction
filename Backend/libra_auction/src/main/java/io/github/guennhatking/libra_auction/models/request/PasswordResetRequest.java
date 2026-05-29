package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class PasswordResetRequest extends RequestEntity {
    @OneToOne
    private OtpRequest otpRequest;

    private String newPassword;

    // CONSTRUCTOR
    protected PasswordResetRequest() {
    }

    public PasswordResetRequest(Customer customer) {
        super(customer, RequestType.PASSWORD_RESET);
    }

    // GETTER
    public OtpRequest getOtpRequest() {
        return otpRequest;
    }

    public String getNewPassword() {
        return newPassword;
    }

    // SETTER
    public void setOtpRequest(OtpRequest otpRequest) {
        this.otpRequest = otpRequest;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
