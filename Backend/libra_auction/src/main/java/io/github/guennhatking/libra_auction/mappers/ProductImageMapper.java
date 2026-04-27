package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;

import io.github.guennhatking.libra_auction.models.product.HinhAnhTaiSan;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    default String toImageUrl(HinhAnhTaiSan hinhAnhTaiSan) {
        if (hinhAnhTaiSan == null) {
            return null;
        }
        return hinhAnhTaiSan.getHinhAnh();
    }
}
