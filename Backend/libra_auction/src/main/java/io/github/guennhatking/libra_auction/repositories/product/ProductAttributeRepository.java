package io.github.guennhatking.libra_auction.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.models.product.ProductAttribute;

public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, String> {
    public void deleteByTaiSanId(String taiSanId);
}
