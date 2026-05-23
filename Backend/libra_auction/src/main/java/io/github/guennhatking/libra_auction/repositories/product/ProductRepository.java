package io.github.guennhatking.libra_auction.repositories.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.models.product.Category;
import io.github.guennhatking.libra_auction.models.product.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByDanhMuc(Category danhMuc);
}
