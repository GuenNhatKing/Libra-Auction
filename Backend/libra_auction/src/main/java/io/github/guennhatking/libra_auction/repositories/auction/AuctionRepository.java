package io.github.guennhatking.libra_auction.repositories.auction;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.enums.auction.AuctionStatus;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.product.Product;

public interface AuctionRepository extends JpaRepository<Auction, String> {
    Optional<Auction> findById(String id);

    List<Auction> findByTrangThaiPhien(AuctionStatus trangThaiPhien);

    List<Auction> findByTaiSan(Product taiSan);

    Optional<Auction> findByIdAndTaiSan_DanhMuc_Id(String id, String categoryId);
}
