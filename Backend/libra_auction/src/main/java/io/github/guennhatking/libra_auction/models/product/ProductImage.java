package io.github.guennhatking.libra_auction.models.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Product product;

    private int displayOrder;
    private String imageUrl;

    // CONSTRUCTOR
    protected ProductImage() {
    }

    public ProductImage(Product product, int displayOrder, String imageUrl) {
        this.product = product;
        this.displayOrder = displayOrder;
        this.imageUrl = imageUrl;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
