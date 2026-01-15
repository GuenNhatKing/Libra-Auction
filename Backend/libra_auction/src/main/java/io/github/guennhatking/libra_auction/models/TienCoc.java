package io.github.guennhatking.libra_auction.models;

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
@Table(name = "tien_coc")
@Getter
@Setter
public class TienCoc {
    @Id
    @Column(length = 50)
    private String id;
    @ManyToOne
    @JoinColumn(name = "nguoi_tham_gia_id")
    private NguoiDung nguoiThamGia;
    private Long soTien;
    private String trangThai;
    private LocalDateTime thoiGianThanhToan;
}