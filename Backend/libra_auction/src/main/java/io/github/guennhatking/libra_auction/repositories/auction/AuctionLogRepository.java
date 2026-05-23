package io.github.guennhatking.libra_auction.repositories.auction;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.auction.AuctionLog;

public interface AuctionLogRepository extends JpaRepository<AuctionLog, String> {
}
