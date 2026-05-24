package io.github.guennhatking.libra_auction.models.product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import java.util.List;

import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.person.Customer;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Customer nguoiTao;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "taiSan")
    private Auction phienDauGia;

    @ManyToOne
    private Category danhMuc;

    @OneToMany(mappedBy = "taiSan")
    private List<ProductImage> hinhAnhTaiSanList;

    @OneToMany(mappedBy = "taiSan")
    private List<ProductAttribute> thuocTinhTaiSanList;

    @OneToMany(mappedBy = "taiSan")
    private List<AttributeCombination> ketHopThuocTinhs;

    public List<AttributeCombination> getKetHopThuocTinhs() {
        return ketHopThuocTinhs;
    }

    public void setKetHopThuocTinhs(List<AttributeCombination> ketHopThuocTinhs) {
        this.ketHopThuocTinhs = ketHopThuocTinhs;
    }

    private String tenTaiSan;
    private Integer soLuong;
    
    @Column(columnDefinition = "TEXT")
    private String moTa;

    // CONSTRUCTOR
    public Product() {
    }

    public Product(String tenTaiSan, int soLuong, String moTa, Category danhMuc) {
        this.tenTaiSan = tenTaiSan;
        this.soLuong = soLuong;
        this.moTa = moTa;
        this.danhMuc = danhMuc;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getNguoiTao() {
        return nguoiTao;
    }

    public Auction getPhienDauGia() {
        return phienDauGia;
    }

    public Category getDanhMuc() {
        return danhMuc;
    }

    public String getTenTaiSan() {
        return tenTaiSan;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public String getMoTa() {
        return moTa;
    }

    public List<ProductImage> getHinhAnhTaiSanList() {
        return hinhAnhTaiSanList;
    }

    public List<ProductAttribute> getThuocTinhTaiSanList() {
        return thuocTinhTaiSanList;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setNguoiTao(Customer nguoiTao) {
        this.nguoiTao = nguoiTao;
    }

    public void setPhienDauGia(Auction phienDauGia) {
        this.phienDauGia = phienDauGia;
    }

    public void setDanhMuc(Category danhMuc) {
        this.danhMuc = danhMuc;
    }

    public void setTenTaiSan(String tenTaiSan) {
        this.tenTaiSan = tenTaiSan;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public void setHinhAnhTaiSanList(List<ProductImage> hinhAnhTaiSanList) {
        this.hinhAnhTaiSanList = hinhAnhTaiSanList;
    }

    public void setThuocTinhTaiSanList(List<ProductAttribute> thuocTinhTaiSanList) {
        this.thuocTinhTaiSanList = thuocTinhTaiSanList;
    }
}
