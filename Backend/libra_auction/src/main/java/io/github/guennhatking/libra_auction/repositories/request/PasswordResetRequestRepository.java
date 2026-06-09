package io.github.guennhatking.libra_auction.repositories.request;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.request.PasswordResetRequest;

public interface PasswordResetRequestRepository extends JpaRepository<PasswordResetRequest, String> {
    Optional<PasswordResetRequest> findByToken(String token);
}
