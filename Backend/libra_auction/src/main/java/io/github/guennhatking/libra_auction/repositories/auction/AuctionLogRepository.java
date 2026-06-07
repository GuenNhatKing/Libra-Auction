package io.github.guennhatking.libra_auction.repositories.auction;

import io.github.guennhatking.libra_auction.models.auction.AuctionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AuctionLogRepository extends JpaRepository<AuctionLog, String> {
    @Query("SELECT al FROM AuctionLog al LEFT JOIN FETCH al.bidder WHERE al.auction.id = :auctionId ORDER BY al.timestamp DESC")
    List<AuctionLog> findByAuctionId(@Param("auctionId") String auctionId);

    @Query("SELECT al FROM AuctionLog al LEFT JOIN FETCH al.bidder WHERE al.auction.id = :auctionId ORDER BY al.timestamp DESC LIMIT 1")
    Optional<AuctionLog> findLatestBidWithBidder(@Param("auctionId") String auctionId);

    @Query("SELECT COUNT(al) FROM AuctionLog al WHERE al.auction.id = :auctionId")
    int countByAuctionId(@Param("auctionId") String auctionId);
}