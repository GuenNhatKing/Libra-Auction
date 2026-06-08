package io.github.guennhatking.libra_auction.repositories.auction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.guennhatking.libra_auction.enums.auction.AuctionStatus;
import io.github.guennhatking.libra_auction.models.auction.AuctionResult;

public interface AuctionResultRepository extends JpaRepository<AuctionResult, String> {
    List<AuctionResult> findByWinner_IdAndAuction_AuctionStatusOrderByEndTimeDesc(
            String winnerId,
            AuctionStatus auctionStatus);
}
