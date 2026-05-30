package io.github.guennhatking.libra_auction.mappers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import io.github.guennhatking.libra_auction.models.product.Product;
import io.github.guennhatking.libra_auction.viewmodels.response.AttributeResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;

@Mapper(componentModel = "spring", uses = { ProductImageMapper.class, ProductAttributeMapper.class })
public interface ProductResponseMapper {

    @Mapping(source = "id", target = "product_id")
    @Mapping(source = "name", target = "product_name")
    @Mapping(source = "quantity", target = "quantity")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "category.id", target = "category_id")
    @Mapping(source = "category.name", target = "category_name")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "images", target = "images")
    @Mapping(source = ".", target = "attributes", qualifiedByName = "resolveAllAttributes")
    ProductResponse toProductResponse(Product product);

    List<ProductResponse> toProductResponseList(List<Product> products);

    @Named("resolveAllAttributes")
    default List<AttributeResponse> resolveAllAttributes(Product product) {
        if (product == null)
            return Collections.emptyList();

        List<AttributeResponse> results = new ArrayList<>();

        // Custom attributes
        if (product.getAttributes() != null) {
            product.getAttributes().forEach(attr ->
                    results.add(new AttributeResponse(attr.getAttributeName(), attr.getAttributeValue(), false)));
        }

        // Standardized attributes
        if (product.getAttributeCombinations() != null) {
            product.getAttributeCombinations().forEach(ac -> {
                if (ac.getStandardizedAttribute() != null) {
                    results.add(new AttributeResponse(
                            ac.getStandardizedAttribute().getAttributeName(),
                            ac.getStandardizedAttribute().getAttributeValue(),
                            true));
                }
            });
        }

        return results;
    }
}
