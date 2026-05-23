package io.github.guennhatking.libra_auction.repositories.auction;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.auction.BidRejectionRecord;

public interface BidRejectionRecordRepository extends JpaRepository<BidRejectionRecord, String> {
}
