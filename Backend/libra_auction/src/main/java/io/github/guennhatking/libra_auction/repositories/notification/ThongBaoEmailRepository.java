package io.github.guennhatking.libra_auction.repositories.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.notification.ThongBaoEmail;

public interface ThongBaoEmailRepository extends JpaRepository<ThongBaoEmail, String> {
}
