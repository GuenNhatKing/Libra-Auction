package io.github.guennhatking.libra_auction.repositories.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.models.product.ProductAttribute;

public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, String> {
    List<ProductAttribute> findByProductId(String productId);

    public void deleteByProductId(String productId);
}
