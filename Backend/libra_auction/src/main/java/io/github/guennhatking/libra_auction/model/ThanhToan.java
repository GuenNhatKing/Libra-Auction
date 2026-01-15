package io.github.guennhatking.libra_auction.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "thanh_toan")
@Getter
@Setter
public class ThanhToan {

    @Id
    @Column(length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "phien_dau_gia_id")
    private PhienDauGia phienDauGia;

    @ManyToOne
    @JoinColumn(name = "nguoi_tra_id")
    private NguoiDung nguoiTra;

    @ManyToOne
    @JoinColumn(name = "nguoi_nhan_id")
    private NguoiDung nguoiNhan;

    private Long soTien;
    private LocalDateTime thoiGianThanhToan;
    private Integer trangThai;
}
