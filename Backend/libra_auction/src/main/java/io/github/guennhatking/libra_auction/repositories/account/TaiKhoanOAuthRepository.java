package io.github.guennhatking.libra_auction.repositories.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import io.github.guennhatking.libra_auction.models.account.TaiKhoanOAuth;
import java.util.Optional;

public interface TaiKhoanOAuthRepository extends JpaRepository<TaiKhoanOAuth, String> {
    @Query("SELECT t FROM TaiKhoanOAuth t WHERE t.provider = :provider AND t.providerId = :providerId")
    Optional<TaiKhoanOAuth> findByProviderAndProviderId(String provider, String providerId);

    @Query("SELECT t FROM TaiKhoanOAuth t WHERE t.providerId = :providerId")
    Optional<TaiKhoanOAuth> findByProviderId(String providerId);
}
