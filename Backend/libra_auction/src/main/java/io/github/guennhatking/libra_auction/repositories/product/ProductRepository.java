package io.github.guennhatking.libra_auction.repositories.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.enums.product.ProductStatus;
import io.github.guennhatking.libra_auction.models.product.Category;
import io.github.guennhatking.libra_auction.models.product.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByCategory(Category category);

    List<Product> findByLatestVersionTrueAndDeletedFalse();

    List<Product> findByRootProductId(String rootProductId);

    List<Product> findByCreator_IdAndLatestVersionTrueAndDeletedFalse(String creatorId);

    List<Product> findByStatusAndLatestVersionTrueAndDeletedFalse(ProductStatus status);
}
