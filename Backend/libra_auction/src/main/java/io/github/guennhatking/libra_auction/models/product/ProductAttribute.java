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
    private Product product;

    private String attributeName;
    private String attributeValue;

    // CONSTRUCTOR
    public ProductAttribute() {
    }

    public ProductAttribute(Product product, String attributeName, String attributeValue) {
        this.product = product;
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public String getAttributeName() {
        return attributeName;
    }

    public String getAttributeValue() {
        return attributeValue;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setAttributeName(String attributeName) {
        this.attributeName = attributeName;
    }

    public void setAttributeValue(String attributeValue) {
        this.attributeValue = attributeValue;
    }
}
