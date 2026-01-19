package io.github.guennhatking.libra_auction.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "ban_ghi_phien_dau_gia")
@Data 
@Getter
@Setter
public class BanGhiPhienDauGia {

    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "muc_gia")
    private Long mucGia;

    @Column(name = "thoi_gian")
    private LocalDateTime thoiGian;

    @ManyToOne
    @JoinColumn(name = "phien_dau_gia_id", nullable = false)
    private PhienDauGia phienDauGia;

    @ManyToOne
    @JoinColumn(name = "nguoi_dat_gia_id", nullable = false)
    private NguoiDung nguoiDatGia;

    
}