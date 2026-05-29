package io.github.guennhatking.libra_auction.repositories.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import io.github.guennhatking.libra_auction.models.account.AccountOAuth;
import java.util.Optional;

public interface AccountOAuthRepository extends JpaRepository<AccountOAuth, String> {
    @Query("SELECT a FROM AccountOAuth a WHERE a.provider = :provider AND a.providerId = :providerId")
    Optional<AccountOAuth> findByProviderAndProviderId(String provider, String providerId);

    @Query("SELECT a FROM AccountOAuth a WHERE a.providerId = :providerId")
    Optional<AccountOAuth> findByProviderId(String providerId);
}
