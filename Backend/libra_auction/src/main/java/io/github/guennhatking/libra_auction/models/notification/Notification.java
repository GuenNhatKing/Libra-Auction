package io.github.guennhatking.libra_auction.models.notification;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    protected String id;

    @ManyToOne
    protected Customer recipient;

    protected String content;
    protected OffsetDateTime sentAt;

    // CONSTRUCTOR
    protected Notification() {
    }

    public Notification(Customer recipient, String content) {
        this.recipient = recipient;
        this.content = content;
        this.sentAt = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Customer getRecipient() {
        return recipient;
    }

    public String getContent() {
        return content;
    }

    public OffsetDateTime getSentAt() {
        return sentAt;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setRecipient(Customer recipient) {
        this.recipient = recipient;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setSentAt(OffsetDateTime sentAt) {
        this.sentAt = sentAt;
    }
}
