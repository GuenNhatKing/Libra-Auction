package io.github.guennhatking.libra_auction.repositories.request;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.request.OtpRequest;

public interface OtpRequestRepository extends JpaRepository<OtpRequest, String> {
}
