package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;

import io.github.guennhatking.libra_auction.models.product.ProductImage;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    default String toImageUrl(ProductImage hinhAnhTaiSan) {
        if (hinhAnhTaiSan == null) {
            return null;
        }
        return hinhAnhTaiSan.getHinhAnh();
    }
}
