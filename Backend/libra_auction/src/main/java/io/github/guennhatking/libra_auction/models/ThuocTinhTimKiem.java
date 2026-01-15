package io.github.guennhatking.libra_auction.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "thuoc_tinh_tim_kiem")
@Getter
@Setter
public class ThuocTinhTimKiem {

    @Id
    @Column(length = 50)
    private String id;

    private String thuocTinh;
    private String giaTri;

    @ManyToOne
    @JoinColumn(name = "tai_san_id")
    private TaiSan taiSan;
}
