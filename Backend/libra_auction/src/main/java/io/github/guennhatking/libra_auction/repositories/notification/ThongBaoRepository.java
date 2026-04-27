package io.github.guennhatking.libra_auction.repositories.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.notification.ThongBao;

public interface ThongBaoRepository extends JpaRepository<ThongBao, String> {
}
