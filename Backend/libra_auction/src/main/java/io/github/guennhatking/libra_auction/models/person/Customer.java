package io.github.guennhatking.libra_auction.models.person;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import io.github.guennhatking.libra_auction.enums.account.EmailStatus;
import io.github.guennhatking.libra_auction.enums.account.AccountStatus;
import io.github.guennhatking.libra_auction.models.account.Role;
import io.github.guennhatking.libra_auction.models.account.Account;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    protected List<Account> linkedAccounts;

    protected String fullName;
    protected String phoneNumber;
    protected String identityNumber;
    protected String avatarUrl;
    protected String email;

    @ManyToMany
    private List<Role> roles;

    @Enumerated(EnumType.STRING)
    protected EmailStatus emailStatus;

    @Enumerated(EnumType.STRING)
    protected AccountStatus accountStatus;

    protected OffsetDateTime createdAt;

    // CONSTRUCTOR
    public Customer() {
    }

    public Customer(String fullName, String email) {
        this.fullName = fullName;
        this.email = email;
        this.createdAt = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public List<Account> getLinkedAccounts() {
        return linkedAccounts;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getEmail() {
        return email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public EmailStatus getEmailStatus() {
        return emailStatus;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setLinkedAccounts(List<Account> linkedAccounts) {
        this.linkedAccounts = linkedAccounts;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public void setEmailStatus(EmailStatus emailStatus) {
        this.emailStatus = emailStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
