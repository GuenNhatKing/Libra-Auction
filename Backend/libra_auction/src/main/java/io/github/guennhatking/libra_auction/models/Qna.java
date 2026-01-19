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
@Table(name = "qna")
@Getter
@Setter
public class Qna {

    @Id
    @Column(length = 50)
    private String id;

    @ManyToOne
    @JoinColumn(name = "phien_dau_gia_id")
    private PhienDauGia phienDauGia;

    @ManyToOne
    @JoinColumn(name = "nguoi_hoi_id")
    private NguoiDung nguoiHoi;

    @ManyToOne
    @JoinColumn(name = "nguoi_tra_loi_id")
    private NguoiDung nguoiTraLoi;

    @Column(columnDefinition = "text")
    private String noiDungHoi;

    @Column(columnDefinition = "text")
    private String noiDungTraLoi;

    private LocalDateTime thoiGianHoi;
    private LocalDateTime thoiGianTraLoi;

    private String trangThaiQna;
}
