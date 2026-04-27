package io.github.guennhatking.libra_auction.repositories.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.notification.ThongBaoUngDung;

public interface ThongBaoUngDungRepository extends JpaRepository<ThongBaoUngDung, String> {
}
