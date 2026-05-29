package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;

@Entity
public class OtpRequest extends RequestEntity {
    private String generatedOtpCode;
    private String userInputOtpCode;

    // CONSTRUCTOR
    protected OtpRequest() {
    }

    public OtpRequest(Customer customer) {
        super(customer, RequestType.OTP);
    }

    // GETTER
    public String getGeneratedOtpCode() {
        return generatedOtpCode;
    }

    public String getUserInputOtpCode() {
        return userInputOtpCode;
    }

    // SETTER
    public void setGeneratedOtpCode(String generatedOtpCode) {
        this.generatedOtpCode = generatedOtpCode;
    }

    public void setUserInputOtpCode(String userInputOtpCode) {
        this.userInputOtpCode = userInputOtpCode;
    }
}
