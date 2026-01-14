package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "phien_dau_gia")
public class PhienDauGia {

    @Id
    @Column(length = 50)
    private String id;

    private LocalDateTime thoiGianBatDau;
    private LocalDateTime thoiGianKetThuc;

    @Column(name = "trang_thai_phien")
    private String trangThaiPhien;
}
