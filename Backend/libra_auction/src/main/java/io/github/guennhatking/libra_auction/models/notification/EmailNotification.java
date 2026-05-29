package io.github.guennhatking.libra_auction.models.notification;

import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;

@Entity
public class EmailNotification extends Notification {

    // CONSTRUCTOR
    protected EmailNotification() {
    }

    public EmailNotification(Customer recipient, String content) {
        super(recipient, content);
    }
}
