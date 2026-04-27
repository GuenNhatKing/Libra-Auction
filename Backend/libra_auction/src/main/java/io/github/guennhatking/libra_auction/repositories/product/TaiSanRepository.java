package io.github.guennhatking.libra_auction.repositories.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.models.product.DanhMuc;
import io.github.guennhatking.libra_auction.models.product.TaiSan;

public interface TaiSanRepository extends JpaRepository<TaiSan, String> {
    List<TaiSan> findByDanhMuc(DanhMuc danhMuc);
}
