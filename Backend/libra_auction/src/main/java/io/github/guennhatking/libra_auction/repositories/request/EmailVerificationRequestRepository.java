package io.github.guennhatking.libra_auction.repositories.request;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.request.EmailVerificationRequest;

public interface EmailVerificationRequestRepository extends JpaRepository<EmailVerificationRequest, String> {
}
