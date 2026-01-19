package io.github.guennhatking.libra_auction.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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

    @ManyToMany
    @JoinTable(
        name = "tham_gia_dau_gia",
        joinColumns = @JoinColumn(name = "nguoi_tham_gia_id"),
        inverseJoinColumns = @JoinColumn(name = "phien_dau_gia_id")
    )
    private Set<PhienDauGia> phienDaThamGia = new HashSet<>();
    @OneToMany(mappedBy = "chuTaiSan")
    private List<ThongTinPhienDauGia> phienDaTao = new ArrayList<>();
}