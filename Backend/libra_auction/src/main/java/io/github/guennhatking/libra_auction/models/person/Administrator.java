package io.github.guennhatking.libra_auction.models.person;

import io.github.guennhatking.libra_auction.models.account.AccountPassword;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne
    private AccountPassword account;

    // CONSTRUCTOR
    protected Administrator() {
    }

    public Administrator(AccountPassword account) {
        this.account = account;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public AccountPassword getAccount() {
        return account;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setAccount(AccountPassword account) {
        this.account = account;
    }
}
