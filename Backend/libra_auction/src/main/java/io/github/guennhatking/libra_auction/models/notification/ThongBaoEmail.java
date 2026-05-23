package io.github.guennhatking.libra_auction.models.notification;

import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;

@Entity
public class ThongBaoEmail extends ThongBao {

    // CONSTRUCTOR
    protected ThongBaoEmail() {
    }

    public ThongBaoEmail(Customer nguoiNhan, String noiDung) {
        super(nguoiNhan, noiDung);
    }
}
