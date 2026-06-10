package io.github.guennhatking.libra_auction.viewmodels.response;

import io.github.guennhatking.libra_auction.enums.account.AccountStatus;
import io.github.guennhatking.libra_auction.enums.account.EmailStatus;

public record AdminPendingUserResponse(
        String id,
        String fullName,
        String phoneNumber,
        String identityNumber,
        String email,
        String avatarUrl,
        EmailStatus emailStatus,
        AccountStatus accountStatus,
        String role) {
}
