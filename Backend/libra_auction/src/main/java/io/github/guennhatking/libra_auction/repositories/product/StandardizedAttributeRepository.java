package io.github.guennhatking.libra_auction.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.models.product.StandardizedAttribute;

public interface StandardizedAttributeRepository extends JpaRepository<StandardizedAttribute, String> {
}
