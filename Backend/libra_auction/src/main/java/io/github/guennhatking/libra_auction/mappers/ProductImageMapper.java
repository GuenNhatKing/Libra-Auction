package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;

import io.github.guennhatking.libra_auction.models.product.ProductImage;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {
    default String toImageUrl(ProductImage productImage) {
        if (productImage == null) {
            return null;
        }
        return productImage.getImageUrl();
    }
}
