package io.github.guennhatking.libra_auction.viewmodels.request;

import java.util.Set;

import io.github.guennhatking.libra_auction.models.account.Permission;

public record RoleRequest(
        String name,
        String description,
        Set<Permission> permissions) {
}
