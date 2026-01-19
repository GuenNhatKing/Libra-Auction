package io.github.guennhatking.libra_auction.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
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
    @JoinColumns({
    @JoinColumn(name = "phien_dau_gia_id"),
    @JoinColumn(name = "nguoi_tham_gia_id")
    })
    private ThamGiaDauGia thamGiaDauGia;

    @Column(name = "so_tien")
    private Long soTien;

    @Column(name = "trang_thai")
    private String trangThai;

    @Column(name = "thoi_gian_thanh_toan")
    private LocalDateTime thoiGianThanhToan;
}
