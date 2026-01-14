package io.github.guennhatking.libra_auction.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "danh_muc")
public class DanhMuc {

    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "ten_danh_muc", nullable = false)
    private String tenDanhMuc;
}
