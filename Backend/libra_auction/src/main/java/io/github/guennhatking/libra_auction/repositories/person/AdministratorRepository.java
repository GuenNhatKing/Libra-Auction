package io.github.guennhatking.libra_auction.repositories.person;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.person.Administrator;

public interface AdministratorRepository extends JpaRepository<Administrator, String> {
}
