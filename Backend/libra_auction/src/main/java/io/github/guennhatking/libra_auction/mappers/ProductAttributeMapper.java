package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.guennhatking.libra_auction.models.product.ThuocTinhTaiSan;
import io.github.guennhatking.libra_auction.viewmodels.response.AttributeResponse;

@Mapper(componentModel = "spring")
public interface ProductAttributeMapper {

    @Mapping(source = "tenThuocTinh", target = "key")
    @Mapping(source = "giaTri", target = "value")
    @Mapping(target = "isSystem", constant = "false") 
    AttributeResponse toAttributeResponse(ThuocTinhTaiSan attr);
}
