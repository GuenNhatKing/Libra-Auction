package io.github.guennhatking.libra_auction.repositories.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import io.github.guennhatking.libra_auction.models.account.AccountPassword;
import java.util.Optional;

public interface AccountPasswordRepository extends JpaRepository<AccountPassword, String> {
    @Query("SELECT a FROM AccountPassword a LEFT JOIN FETCH a.customer WHERE a.username = :username")
    Optional<AccountPassword> findByUsername(String username);

    @Query("SELECT a FROM AccountPassword a LEFT JOIN FETCH a.customer c WHERE c.id = :userId")
    Optional<AccountPassword> findByCustomerId(String userId);

    @Query("SELECT a FROM AccountPassword a LEFT JOIN FETCH a.customer c WHERE c.email = :email")
    Optional<AccountPassword> findByCustomerEmail(String email);
}
