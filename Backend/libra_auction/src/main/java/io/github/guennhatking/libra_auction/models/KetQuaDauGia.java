package io.github.guennhatking.libra_auction.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "ket_qua_dau_gia")
@Getter
@Setter
public class KetQuaDauGia<PhienDauGia, NguoiDung> {
    @Id
    @Column(name = "phien_dau_gia_id")
    private String phienDauGiaId;
    @OneToOne
    @MapsId
    @JoinColumn(name = "phien_dau_gia_id")
    private PhienDauGia phienDauGia;
    @ManyToOne
    @JoinColumn(name = "nguoi_thang_dau_gia_id")
    private NguoiDung nguoiThang;
    private LocalDateTime thoiGianKetThuc;
    private Long giaTrungDauGia;
}