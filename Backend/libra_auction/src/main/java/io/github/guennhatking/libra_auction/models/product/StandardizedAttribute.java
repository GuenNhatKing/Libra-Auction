package io.github.guennhatking.libra_auction.models.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StandardizedAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String attributeName;
    private String attributeValue;

    // CONSTRUCTOR
    public StandardizedAttribute() {
    }

    public StandardizedAttribute(String attributeName, String attributeValue) {
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
    }

    // GETTER
    public String getId() {
        return id;
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

    public void setAttributeName(String attributeName) {
        this.attributeName = attributeName;
    }

    public void setAttributeValue(String attributeValue) {
        this.attributeValue = attributeValue;
    }
}
