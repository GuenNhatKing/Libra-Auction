package io.github.guennhatking.libra_auction.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.models.product.DanhMuc;

public interface DanhMucRepository extends JpaRepository<DanhMuc, String> {
}
