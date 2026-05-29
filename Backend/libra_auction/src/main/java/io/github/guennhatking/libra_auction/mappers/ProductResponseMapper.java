package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.guennhatking.libra_auction.models.product.Product;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;

import java.util.List;

@Mapper(componentModel = "spring", uses = { ProductImageMapper.class, ProductAttributeMapper.class })
public interface ProductResponseMapper {

    @Mapping(source = "id", target = "product_id")
    @Mapping(source = "name", target = "product_name")
    @Mapping(source = "quantity", target = "quantity")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "category.id", target = "category_id")
    @Mapping(source = "category.name", target = "category_name")
    @Mapping(source = "images", target = "images")
    @Mapping(source = "attributes", target = "attributes")
    ProductResponse toProductResponse(Product product);

    List<ProductResponse> toProductResponseList(List<Product> products);
}
