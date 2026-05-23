package io.github.guennhatking.libra_auction.repositories.person;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.person.Owner;

public interface OwnerRepository extends JpaRepository<Owner, String> {
}
