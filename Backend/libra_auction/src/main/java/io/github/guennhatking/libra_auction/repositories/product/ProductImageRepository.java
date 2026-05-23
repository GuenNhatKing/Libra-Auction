package io.github.guennhatking.libra_auction.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.models.product.ProductImage;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, String> {
	List<ProductImage> findByTaiSanIdOrderByThuTuHienThiAsc(String taiSanId);

	void deleteByTaiSanId(String taiSanId);
}
