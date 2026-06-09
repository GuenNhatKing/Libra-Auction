package io.github.guennhatking.libra_auction.models.request;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;

import java.time.OffsetDateTime;

import io.github.guennhatking.libra_auction.enums.request.RequestType;
import io.github.guennhatking.libra_auction.enums.request.RequestStatus;
import io.github.guennhatking.libra_auction.models.notification.Notification;
import io.github.guennhatking.libra_auction.models.person.Customer;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class RequestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected String id;

    @ManyToOne
    protected Customer customer;

    @ManyToOne
    protected Notification notification;

    protected String token;

    @Enumerated(EnumType.STRING)
    protected RequestType requestType;

    @Enumerated(EnumType.STRING)
    protected RequestStatus requestStatus;

    protected OffsetDateTime activationExpiry;
    protected OffsetDateTime usageExpiry;

    // CONSTRUCTOR
    protected RequestEntity() {
    }

    public RequestEntity(Customer customer, RequestType requestType) {
        this.customer = customer;
        this.requestType = requestType;
        this.requestStatus = RequestStatus.INITIATED;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Notification getNotification() {
        return notification;
    }

    public String getToken() {
        return token;
    }

    public RequestType getRequestType() {
        return requestType;
    }

    public RequestStatus getRequestStatus() {
        return requestStatus;
    }

    public OffsetDateTime getActivationExpiry() {
        return activationExpiry;
    }

    public OffsetDateTime getUsageExpiry() {
        return usageExpiry;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setRequestType(RequestType requestType) {
        this.requestType = requestType;
    }

    protected void setRequestStatus(RequestStatus requestStatus) {
        this.requestStatus = requestStatus;
    }

    public void setActivationExpiry(OffsetDateTime activationExpiry) {
        this.activationExpiry = activationExpiry;
    }

    public void setUsageExpiry(OffsetDateTime usageExpiry) {
        this.usageExpiry = usageExpiry;
    }

    // BUSINESS LOGIC

    /**
     * Activate this request. Checks that status is INITIATED and activation has not expired.
     * Subclasses may override to add additional activation logic.
     */
    public void activate() {
        if (this.requestStatus != RequestStatus.INITIATED) {
            throw new IllegalStateException("Request is not in INITIATED state");
        }
        if (this.activationExpiry != null && OffsetDateTime.now().isAfter(this.activationExpiry)) {
            throw new IllegalStateException("Request activation has expired");
        }
        this.requestStatus = RequestStatus.ACTIVATED;
    }

    /**
     * Mark this request as used. Checks that status is ACTIVATED and usage has not expired.
     * Subclasses may override to add additional use logic.
     */
    public void use() {
        if (this.requestStatus != RequestStatus.ACTIVATED) {
            throw new IllegalStateException("Request is not in ACTIVATED state");
        }
        if (this.usageExpiry != null && OffsetDateTime.now().isAfter(this.usageExpiry)) {
            throw new IllegalStateException("Request usage has expired");
        }
        this.requestStatus = RequestStatus.COMPLETED;
    }
}
