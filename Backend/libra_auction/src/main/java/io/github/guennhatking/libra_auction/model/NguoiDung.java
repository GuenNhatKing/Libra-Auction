package io.github.guennhatking.libra_auction.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "nguoi_dung")
@Getter
@Setter
public class NguoiDung {

    @Id
    @Column(length = 50)
    private String id;

    @OneToOne
    @JoinColumn(name = "tai_khoan_id", unique = true)
    private TaiKhoan taiKhoan;

    @Column(name = "ho_va_ten")
    private String hoVaTen;

    private String sdt;
    private String cccd;
}
