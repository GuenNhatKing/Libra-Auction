package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import io.github.guennhatking.libra_auction.models.account.AccountPassword;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.viewmodels.request.CustomerUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.CustomerResponse;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CustomerMapper {
    Customer toEntity(CustomerUpdateRequest request);

    CustomerResponse toResponseInternal(Customer entity);

    default CustomerResponse toResponse(Customer entity) {
        CustomerResponse base = toResponseInternal(entity);
        boolean hasPassword = entity.getLinkedAccounts() != null
                && entity.getLinkedAccounts().stream()
                        .anyMatch(a -> a instanceof AccountPassword);
        String username = null;
        if (hasPassword && entity.getLinkedAccounts() != null) {
            username = entity.getLinkedAccounts().stream()
                    .filter(a -> a instanceof AccountPassword)
                    .map(a -> ((AccountPassword) a).getUsername())
                    .findFirst()
                    .orElse(null);
        }
        return new CustomerResponse(
                base.id(), base.fullName(), base.phoneNumber(), base.identityNumber(),
                base.email(), base.avatarUrl(), base.emailStatus(), base.accountStatus(),
                base.role(), hasPassword, username);
    }
}
