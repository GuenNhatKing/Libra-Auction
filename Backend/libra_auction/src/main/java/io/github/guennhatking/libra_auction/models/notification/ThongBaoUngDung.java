package io.github.guennhatking.libra_auction.models.notification;

import io.github.guennhatking.libra_auction.models.person.NguoiDung;
import jakarta.persistence.Entity;

@Entity
public class ThongBaoUngDung extends ThongBao {

    // CONSTRUCTOR
    protected ThongBaoUngDung() {
    }

    public ThongBaoUngDung(NguoiDung nguoiNhan, String noiDung) {
        super(nguoiNhan, noiDung);
    }
}
