package io.github.guennhatking.libra_auction.models.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class AttributeCombination {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Product product;

    @ManyToOne
    private StandardizedAttribute standardizedAttribute;

    // CONSTRUCTOR
    protected AttributeCombination() {
    }

    public AttributeCombination(Product product, StandardizedAttribute standardizedAttribute) {
        this.product = product;
        this.standardizedAttribute = standardizedAttribute;
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public StandardizedAttribute getStandardizedAttribute() {
        return standardizedAttribute;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setStandardizedAttribute(StandardizedAttribute standardizedAttribute) {
        this.standardizedAttribute = standardizedAttribute;
    }
}
