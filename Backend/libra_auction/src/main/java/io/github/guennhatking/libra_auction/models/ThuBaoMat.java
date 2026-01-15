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
@Table(name = "thu_bao_mat")
@Getter
@Setter
public class ThuBaoMat {

    @Id
    @Column(length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "thu_id")
    private Thu thu;

    private String token;
    private Integer yeuCau;
    private LocalDateTime thoiGianHetHan;
    private Integer trangThai;
}
