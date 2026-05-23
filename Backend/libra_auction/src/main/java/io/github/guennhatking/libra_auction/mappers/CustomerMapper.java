package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.viewmodels.request.CustomerUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.CustomerResponse;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CustomerMapper {
    Customer toEntity(CustomerUpdateRequest request);
    CustomerResponse toResponse(Customer entity);
}
