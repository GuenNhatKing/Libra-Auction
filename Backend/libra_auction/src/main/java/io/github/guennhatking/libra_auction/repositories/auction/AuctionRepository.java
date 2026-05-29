package io.github.guennhatking.libra_auction.repositories.auction;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.enums.auction.AuctionStatus;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.product.Product;

public interface AuctionRepository extends JpaRepository<Auction, String> {
    Optional<Auction> findById(String id);

    List<Auction> findByAuctionStatus(AuctionStatus auctionStatus);

    List<Auction> findByProduct(Product product);

    Optional<Auction> findByIdAndProduct_Category_Id(String id, String categoryId);

    Optional<Auction> findByIdAndCreator_Id(String id, String userId);
}
