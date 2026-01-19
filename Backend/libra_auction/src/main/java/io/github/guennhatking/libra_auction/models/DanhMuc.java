package io.github.guennhatking.libra_auction.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "danh_muc")
@Getter
@Setter
public class DanhMuc {

    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "ten_danh_muc", nullable = false)
    private String tenDanhMuc;
}
