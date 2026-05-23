package io.github.guennhatking.libra_auction.repositories.request;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.request.CreateAuctionRequest;

public interface CreateAuctionRequestRepository extends JpaRepository<CreateAuctionRequest, String> {
}
