package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.guennhatking.libra_auction.models.product.ProductAttribute;
import io.github.guennhatking.libra_auction.viewmodels.response.AttributeResponse;

@Mapper(componentModel = "spring")
public interface ProductAttributeMapper {

    @Mapping(source = "attributeName", target = "key")
    @Mapping(source = "attributeValue", target = "value")
    @Mapping(target = "isSystem", constant = "false")
    AttributeResponse toAttributeResponse(ProductAttribute attr);
}
