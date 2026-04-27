package io.github.guennhatking.libra_auction.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import io.github.guennhatking.libra_auction.models.product.TaiSan;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;

import java.util.List;

@Mapper(componentModel = "spring", uses = { ProductImageMapper.class, ProductAttributeMapper.class })
public interface ProductResponseMapper {

    @Mapping(source = "id", target = "product_id")
    @Mapping(source = "tenTaiSan", target = "product_name")
    @Mapping(source = "soLuong", target = "quantity")
    @Mapping(source = "moTa", target = "description")
    @Mapping(source = "danhMuc.id", target = "category_id")
    @Mapping(source = "danhMuc.tenDanhMuc", target = "category_name")
    @Mapping(source = "hinhAnhTaiSanList", target = "images")
    @Mapping(source = "thuocTinhTaiSanList", target = "attributes")
    ProductResponse toProductResponse(TaiSan product);

    List<ProductResponse> toProductResponseList(List<TaiSan> products);
}