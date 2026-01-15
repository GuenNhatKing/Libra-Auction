package io.github.guennhatking.libra_auction.model;

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
@Table(name = "thong_tin_phien_dau_gia")
@Getter
@Setter
public class ThongTinPhienDauGia {

    @Id
    @Column(name = "phien_dau_gia_id")
    private String phienDauGiaId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "phien_dau_gia_id")
    private PhienDauGia phienDauGia;

    private String loaiDauGia;
    private Long tienCoc;
    private Long mucGia;
    private Long giaKhoiDiem;

    @Column(columnDefinition = "text")
    private String moTa;

    private String tieuDe;

    @ManyToOne
    @JoinColumn(name = "chu_tai_san_id")
    private NguoiDung chuTaiSan;
}
