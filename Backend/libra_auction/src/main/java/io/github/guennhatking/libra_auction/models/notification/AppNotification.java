package io.github.guennhatking.libra_auction.models.notification;

import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;

@Entity
public class AppNotification extends Notification {

    // CONSTRUCTOR
    protected AppNotification() {
    }

    public AppNotification(Customer recipient, String content) {
        super(recipient, content);
    }
}
