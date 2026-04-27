package io.github.guennhatking.libra_auction.models.account;

import io.github.guennhatking.libra_auction.enums.account.TrangThaiTaiKhoan;
import jakarta.persistence.Entity;

@Entity
public class TaiKhoanPassword extends TaiKhoan {
    private String passwordHash;
    private byte[] salt;

    // CONSTRUCTOR
    protected TaiKhoanPassword() {
    }

    public TaiKhoanPassword(String id, String username, String passwordHash, byte[] salt) {
        super(id, username, TrangThaiTaiKhoan.CHO_XAC_NHAN);
        this.passwordHash = passwordHash;
        this.salt = salt;
    }

    // GETTER
    public String getPasswordHash() {
        return passwordHash;
    }

    public byte[] getSalt() {
        return salt;
    }

    // SETTER
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }
}
