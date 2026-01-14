package io.github.guennhatking.libra_auction.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "ban_ghi_phien_dau_gia")
@Data 
public class BanGhiPhienDauGia {

    @Id
    @Column(length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "phien_dau_gia_id", nullable = false)
    private PhienDauGia phienDauGia;

    @ManyToOne
    @JoinColumn(name = "nguoi_dat_gia_id", nullable = false)
    private NguoiDung nguoiDatGia;

    @Column(name = "gia_dat", nullable = false)
    private Long giaDat;

    @Column(name = "thoi_gian_dat")
    private LocalDateTime thoiGianDat;

    @Column(name = "trang_thai_ghi_de")
    private Boolean trangThaiGhiDe; 
}