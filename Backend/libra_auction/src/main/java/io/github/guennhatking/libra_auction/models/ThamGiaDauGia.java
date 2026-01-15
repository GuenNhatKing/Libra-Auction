package io.github.guennhatking.libra_auction.models;

import java.time.LocalDateTime;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "tham_gia_dau_gia")
@Getter
@Setter
public class ThamGiaDauGia {

    @EmbeddedId
    private ThamGiaDauGiaId id;

    @ManyToOne
    @MapsId("phienDauGiaId")
    @JoinColumn(name = "phien_dau_gia_id")
    private PhienDauGia phienDauGia;
    @ManyToOne
    @MapsId("nguoiThamGiaId")
    @JoinColumn(name = "nguoi_tham_gia_id")
    private NguoiDung nguoiThamGia;

    private LocalDateTime thoiGianDangKy;
}

