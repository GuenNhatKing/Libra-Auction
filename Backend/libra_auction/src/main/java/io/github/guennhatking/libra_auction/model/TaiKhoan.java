package io.github.guennhatking.libra_auction.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tai_khoan")
public class TaiKhoan {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(name = "hashed_password", nullable = false)
    private String hashedPassword;

    @Column(nullable = false)
    private String salt;
}
