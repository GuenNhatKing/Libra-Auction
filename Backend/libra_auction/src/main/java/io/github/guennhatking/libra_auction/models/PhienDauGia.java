package io.github.guennhatking.libra_auction.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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

    private LocalDateTime thoiGianBatDau;
    private LocalDateTime thoiGianKetThuc;

    @Column(name = "trang_thai_phien")
    private String trangThaiPhien;
}
