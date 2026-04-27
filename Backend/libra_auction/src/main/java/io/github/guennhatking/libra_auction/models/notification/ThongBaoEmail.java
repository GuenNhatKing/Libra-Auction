package io.github.guennhatking.libra_auction.models.notification;

import io.github.guennhatking.libra_auction.models.person.NguoiDung;
import jakarta.persistence.Entity;

@Entity
public class ThongBaoEmail extends ThongBao {

    // CONSTRUCTOR
    protected ThongBaoEmail() {
    }

    public ThongBaoEmail(NguoiDung nguoiNhan, String noiDung) {
        super(nguoiNhan, noiDung);
    }
}
