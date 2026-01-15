package io.github.guennhatking.libra_auction.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tai_san")
@Getter
@Setter
public class TaiSan {

    @Id
    @Column(length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "phien_dau_gia_id")
    private PhienDauGia phienDauGia;

    private String tenTaiSan;
    private Integer soLuong;

    @Column(columnDefinition = "text")
    private String moTa;

    private Boolean daBan;

    @ManyToOne
    @JoinColumn(name = "danh_muc_id")
    private DanhMuc danhMuc;
}
