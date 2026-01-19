package io.github.guennhatking.libra_auction.models;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "phien_dau_gia")
@Getter
@Setter
public class PhienDauGia {

    @Id
    @Column(length = 50)
    private String id;
    @Column(name = "thoi_gian_bat_dau")
    private LocalDateTime thoiGianBatDau;
    @Column(name = "thoi_gian_ket_thuc")
    private LocalDateTime thoiGianKetThuc;

    @Column(name = "trang_thai_phien")
    private String trangThaiPhien;

    @ManyToMany(mappedBy = "phienDaThamGia")
    private Set<NguoiDung> nguoiThamGia = new HashSet<>();

    @OneToOne(mappedBy = "phienDauGia")
    private ThongTinPhienDauGia thongTin;
}
