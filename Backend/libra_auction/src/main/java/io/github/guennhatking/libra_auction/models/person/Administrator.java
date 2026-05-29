package io.github.guennhatking.libra_auction.models.person;

import io.github.guennhatking.libra_auction.models.account.AccountPassword;

public class Administrator {

    private String id;

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
