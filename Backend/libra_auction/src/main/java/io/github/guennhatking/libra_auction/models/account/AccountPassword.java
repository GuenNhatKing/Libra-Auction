package io.github.guennhatking.libra_auction.models.account;

import io.github.guennhatking.libra_auction.enums.account.AccountStatus;
import jakarta.persistence.Entity;

@Entity
public class AccountPassword extends Account {
    private String username;

    private String passwordHash;
    private byte[] salt;

    // CONSTRUCTOR
    protected AccountPassword() {
    }

    public AccountPassword(String id, String username, String passwordHash, byte[] salt) {
        super(id, AccountStatus.PENDING);
        this.username = username;
        this.passwordHash = passwordHash;
        this.salt = salt;
    }

    // GETTER
    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public byte[] getSalt() {
        return salt;
    }

    // SETTER
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }
}
