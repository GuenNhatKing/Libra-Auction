package io.github.guennhatking.libra_auction.models.auction;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import io.github.guennhatking.libra_auction.enums.auction.ApprovalStatus;
import io.github.guennhatking.libra_auction.enums.auction.AuctionStatus;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.product.Product;
import io.github.guennhatking.libra_auction.models.qa.Question;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Customer nguoiTao;

    private OffsetDateTime thoiGianBatDau;
    private long thoiLuong;

    private long tienCoc;
    private long giaKhoiDiem;
    private long khoangGia;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "phienDauGia")
    private AuctionResult ketQuaDauGia;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "phienDauGia")
    private List<Question> danhSachCauHoi;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "phienDauGia")
    private List<AuctionLog> lichSuDatGia;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "phienDauGia")
    private List<AuctionParticipationInfo> danhSachThamGia;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "phienDauGia")
    private List<BidRejectionRecord> danhSachBoCuoc;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus trangThaiKiemDuyet;

    @Enumerated(EnumType.STRING)
    private AuctionStatus trangThaiPhien;

    private OffsetDateTime thoiGianTao;

    @ManyToOne
    private Product taiSan;

    private long buocGiaNhoNhat;
    private long giaHienTai;

    // CONSTRUCTOR
    public Auction() {
    }

    public Auction(
            Customer nguoiTao,
            Product taiSan,
            OffsetDateTime thoiGianBatDau,
            long thoiLuong,
            long tienCoc,
            long giaKhoiDiem,
            long khoangGia,
            long buocGiaNhoNhat) {
        this.nguoiTao = nguoiTao;
        this.taiSan = taiSan;
        this.thoiGianBatDau = thoiGianBatDau;
        this.thoiLuong = thoiLuong;
        this.tienCoc = tienCoc;
        this.giaKhoiDiem = giaKhoiDiem;
        this.khoangGia = khoangGia;
        this.buocGiaNhoNhat = buocGiaNhoNhat;
        this.thoiGianTao = OffsetDateTime.now(ZoneOffset.UTC);

        this.giaHienTai = giaKhoiDiem;
    }

    public Auction(
            Customer nguoiTao,
            Product taiSan,
            OffsetDateTime thoiGianBatDau,
            long thoiLuong,
            long tienCoc,
            long giaKhoiDiem,
            long khoangGia,
            long buocGiaNhoNhat,
            ApprovalStatus trangThaiKiemDuyet,
            AuctionStatus trangThaiPhien,
            OffsetDateTime thoiGianTao) {
        this.nguoiTao = nguoiTao;
        this.taiSan = taiSan;
        this.thoiGianBatDau = thoiGianBatDau;
        this.thoiLuong = thoiLuong;
        this.tienCoc = tienCoc;
        this.giaKhoiDiem = giaKhoiDiem;
        this.khoangGia = khoangGia;
        this.buocGiaNhoNhat = buocGiaNhoNhat;
        this.trangThaiKiemDuyet = trangThaiKiemDuyet;
        this.trangThaiPhien = trangThaiPhien;
        this.thoiGianTao = thoiGianTao != null ? thoiGianTao : OffsetDateTime.now(ZoneOffset.UTC);

        this.giaHienTai = giaKhoiDiem;
    }



    // GETTER
    public String getId() {
        return id;
    }

    public Customer getNguoiTao() {
        return nguoiTao;
    }

    public OffsetDateTime getThoiGianBatDau() {
        return thoiGianBatDau;
    }

    public long getThoiLuong() {
        return thoiLuong;
    }

    public AuctionResult getKetQuaDauGia() {
        return ketQuaDauGia;
    }

    public List<Question> getDanhSachCauHoi() {
        return danhSachCauHoi;
    }

    public List<AuctionLog> getLichSuDatGia() {
        return lichSuDatGia;
    }

    public List<AuctionParticipationInfo> getDanhSachThamGia() {
        return danhSachThamGia;
    }

    public List<BidRejectionRecord> getDanhSachBoCuoc() {
        return danhSachBoCuoc;
    }

    public ApprovalStatus getTrangThaiKiemDuyet() {
        return trangThaiKiemDuyet;
    }

    public AuctionStatus getTrangThaiPhien() {
        return trangThaiPhien;
    }

    public OffsetDateTime getThoiGianTao() {
        return thoiGianTao;
    }

    public Product getTaiSan() {
        return taiSan;
    }

    public long getGiaKhoiDiem() {
        return giaKhoiDiem;
    }

    public long getTienCoc() {
        return tienCoc;
    }

    public long getKhoangGia() {
        return khoangGia;
    }

    public long getBuocGiaNhoNhat() {
        return buocGiaNhoNhat;
    }

    public long getGiaHienTai() {
        return giaHienTai;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setNguoiTao(Customer nguoiTao) {
        this.nguoiTao = nguoiTao;
    }

    public void setThoiGianBatDau(OffsetDateTime thoiGianBatDau) {
        this.thoiGianBatDau = thoiGianBatDau;
    }

    public void setThoiLuong(long thoiLuong) {
        this.thoiLuong = thoiLuong;
    }

    public void setKetQuaDauGia(AuctionResult ketQuaDauGia) {
        this.ketQuaDauGia = ketQuaDauGia;
    }

    public void setDanhSachCauHoi(List<Question> danhSachCauHoi) {
        this.danhSachCauHoi = danhSachCauHoi;
    }

    public void setLichSuDatGia(List<AuctionLog> lichSuDatGia) {
        this.lichSuDatGia = lichSuDatGia;
    }

    public void setDanhSachThamGia(List<AuctionParticipationInfo> danhSachThamGia) {
        this.danhSachThamGia = danhSachThamGia;
    }

    public void setDanhSachBoCuoc(List<BidRejectionRecord> danhSachBoCuoc) {
        this.danhSachBoCuoc = danhSachBoCuoc;
    }

    public void setTrangThaiKiemDuyet(ApprovalStatus trangThaiKiemDuyet) {
        this.trangThaiKiemDuyet = trangThaiKiemDuyet;
    }

    public void setTrangThaiPhien(AuctionStatus trangThaiPhien) {
        this.trangThaiPhien = trangThaiPhien;
    }

    public void setThoiGianTao(OffsetDateTime thoiGianTao) {
        this.thoiGianTao = thoiGianTao;
    }

    public void setTaiSan(Product taiSan) {
        this.taiSan = taiSan;
    }

    public void setGiaKhoiDiem(long giaKhoiDiem) {
        this.giaKhoiDiem = giaKhoiDiem;
    }

    public void setTienCoc(long tienCoc) {
        this.tienCoc = tienCoc;
    }

    public void setKhoangGia(long khoangGia) {
        this.khoangGia = khoangGia;
    }

    public void setBuocGiaNhoNhat(long buocGiaNhoNhat) {
        this.buocGiaNhoNhat = buocGiaNhoNhat;
    }

    public void setGiaHienTai(long giaHienTai) {
        this.giaHienTai = giaHienTai;
    }
}
