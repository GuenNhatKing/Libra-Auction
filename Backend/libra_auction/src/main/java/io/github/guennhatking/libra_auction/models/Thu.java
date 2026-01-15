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
@Table(name = "thu")
@Getter
@Setter
public class Thu {

    @Id
    @Column(length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "nguoi_gui_id")
    private NguoiDung nguoiGui;

    @ManyToOne
    @JoinColumn(name = "nguoi_nhan_id")
    private NguoiDung nguoiNhan;

    @Column(columnDefinition = "text")
    private String noiDung;

    private Integer phuongThuc;
    private LocalDateTime thoiGianGui;
}
