package io.github.guennhatking.libra_auction.viewmodels.response;

import java.util.Set;

import io.github.guennhatking.libra_auction.enums.account.EmailStatus;
import io.github.guennhatking.libra_auction.enums.account.AccountStatus;
import io.github.guennhatking.libra_auction.models.account.Role;

public record CustomerResponse(
    String id,
    String fullName,
    String phoneNumber,
    String identityNumber,
    String email,
    String avatarUrl,
    EmailStatus emailStatus,
    AccountStatus accountStatus,
    Set<Role> roles
) {
}
