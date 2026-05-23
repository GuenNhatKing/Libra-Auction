package io.github.guennhatking.libra_auction.repositories.person;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.person.Customer;
import java.util.Optional;


public interface CustomerRepository extends JpaRepository<Customer, String> {
    Optional<Customer> findById(String id);
    Optional<Customer> findByEmail(String email);
}
