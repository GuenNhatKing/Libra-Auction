package io.github.guennhatking.libra_auction.repositories.auction;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.auction.AuctionParticipationInfo;

public interface AuctionParticipationInfoRepository extends JpaRepository<AuctionParticipationInfo, String> {
    List<AuctionParticipationInfo> findByParticipantId(String userId);
    List<AuctionParticipationInfo> findByAuctionId(String auctionId);
    Optional<AuctionParticipationInfo> findByParticipantIdAndAuctionId(String userId, String auctionId);
}
