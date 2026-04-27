package io.github.guennhatking.libra_auction.repositories.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.transaction.GiaoDich;

public interface GiaoDichRepository extends JpaRepository<GiaoDich, String> {
}
