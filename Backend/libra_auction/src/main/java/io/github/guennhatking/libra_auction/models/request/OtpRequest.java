package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;

@Entity
public class OtpRequest extends RequestEntity {
    private String generatedOtpCode;

    @Transient
    private String userInputOtpCode;

    @ManyToOne
    private RequestEntity requestToActivate;

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

    public RequestEntity getRequestToActivate() {
        return requestToActivate;
    }

    // SETTER
    public void setGeneratedOtpCode(String generatedOtpCode) {
        this.generatedOtpCode = generatedOtpCode;
    }

    public void setUserInputOtpCode(String userInputOtpCode) {
        this.userInputOtpCode = userInputOtpCode;
    }

    public void setRequestToActivate(RequestEntity requestToActivate) {
        this.requestToActivate = requestToActivate;
    }

    // BUSINESS LOGIC

    @Override
    public void activate() {
        if (this.userInputOtpCode == null || !this.userInputOtpCode.equals(this.generatedOtpCode)) {
            throw new IllegalStateException("OTP code is incorrect.");
        }
        super.activate();
    }

    @Override
    public void use() {
        if (this.requestToActivate != null) {
            this.requestToActivate.activate();
        }
        super.use();
    }
}
