package io.github.guennhatking.libra_auction.models.notification;

import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;

@Entity
public class ThongBaoUngDung extends ThongBao {

    // CONSTRUCTOR
    protected ThongBaoUngDung() {
    }

    public ThongBaoUngDung(Customer nguoiNhan, String noiDung) {
        super(nguoiNhan, noiDung);
    }
}
