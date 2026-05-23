package io.github.guennhatking.libra_auction.repositories.person;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.person.Bidder;

public interface BidderRepository extends JpaRepository<Bidder, String> {
}
