package io.github.guennhatking.libra_auction.repositories.product;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.models.product.ThuocTinhTaiSan;

public interface ThuocTinhTaiSanRepository extends JpaRepository<ThuocTinhTaiSan, String> {
    public void deleteByTaiSanId(String taiSanId);
}
