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
public abstract class TaiKhoan {
    @Id
    protected String id;

    @Enumerated(EnumType.STRING)
    protected AccountStatus trangThai;

    @ManyToOne
    protected Customer nguoiDung;

    // CONSTRUCTOR
    protected TaiKhoan() {
    }

    public TaiKhoan(String id, AccountStatus trangThai) {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("ID không được để trống.");
        }
        this.id = id;
        this.trangThai = trangThai != null ? trangThai : AccountStatus.CHO_XAC_NHAN;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public AccountStatus getTrangThai() {
        return trangThai;
    }

    public Customer getNguoiDung() {
        return nguoiDung;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setTrangThai(AccountStatus trangThai) {
        this.trangThai = trangThai;
    }

    public void setNguoiDung(Customer nguoiDung) {
        this.nguoiDung = nguoiDung;
    }
}