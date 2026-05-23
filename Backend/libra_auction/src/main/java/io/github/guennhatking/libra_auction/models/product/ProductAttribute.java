package io.github.guennhatking.libra_auction.models.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ProductAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Product taiSan;

    private String tenThuocTinh;
    private String giaTri;

    // CONSTRUCTOR
    public ProductAttribute() {
    }

    public ProductAttribute(Product taiSan, String tenThuocTinh, String giaTri) {
        this.taiSan = taiSan;
        this.tenThuocTinh = tenThuocTinh;
        this.giaTri = giaTri;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Product getTaiSan() {
        return taiSan;
    }

    public String getTenThuocTinh() {
        return tenThuocTinh;
    }

    public String getGiaTri() {
        return giaTri;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setTaiSan(Product taiSan) {
        this.taiSan = taiSan;
    }

    public void setTenThuocTinh(String tenThuocTinh) {
        this.tenThuocTinh = tenThuocTinh;
    }

    public void setGiaTri(String giaTri) {
        this.giaTri = giaTri;
    }
}