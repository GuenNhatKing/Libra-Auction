package io.github.guennhatking.libra_auction.models.account;

import io.github.guennhatking.libra_auction.enums.account.AccountStatus;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Account {
    @Id
    protected String id;

    @Enumerated(EnumType.STRING)
    protected AccountStatus status;

    @ManyToOne
    protected Customer customer;

    // CONSTRUCTOR
    protected Account() {
    }

    public Account(String id, AccountStatus status) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("ID cannot be empty.");
        }
        this.id = id;
        this.status = status != null ? status : AccountStatus.PENDING;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public Customer getCustomer() {
        return customer;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
