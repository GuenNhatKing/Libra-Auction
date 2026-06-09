package io.github.guennhatking.libra_auction.models.account;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Role {
    @Id
    private String name;

    private String description;

    // CONSTRUCTOR
    public Role() {
    }

    public Role(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // GETTER
    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    // SETTER
    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
