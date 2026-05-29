package io.github.guennhatking.libra_auction.services;

import io.github.guennhatking.libra_auction.mappers.ProductResponseMapper;
import io.github.guennhatking.libra_auction.models.product.Product;
import io.github.guennhatking.libra_auction.repositories.product.ProductRepository;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductSearchRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.PageResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductSearchService {
    private final ProductRepository productRepository;
    private final ProductResponseMapper productResponseMapper;

    public ProductSearchService(ProductRepository productRepository,
            ProductResponseMapper productResponseMapper) {
        this.productRepository = productRepository;
        this.productResponseMapper = productResponseMapper;
    }

    public PageResponse<ProductResponse> searchProducts(ProductSearchRequest criteria) {
        // Get all products
        List<Product> allProducts = productRepository.findAll();

        // Apply filters
        List<Product> filtered = applyFilters(allProducts, criteria);

        // Apply sorting
        filtered = applySort(filtered, criteria);

        // Apply pagination
        return applyPagination(filtered, criteria);
    }

    private List<Product> applyFilters(List<Product> products, ProductSearchRequest criteria) {
        return products.stream()
                .filter(product -> criteria.name() == null
                        || filterByName(product, criteria.name()))
                .filter(product -> criteria.categoryId() == null
                        || filterByCategory(product, criteria.categoryId()))
                .filter(product -> criteria.attributes() == null
                        || filterByAttributes(product, criteria.attributes()))
                .filter(product -> criteria.creatorId() == null
                    || filterByCreator(product, criteria.creatorId()))
                .collect(Collectors.toList());
    }

    private boolean filterByName(Product product, String name) {
        if (name == null || name.isBlank()) {
            return true;
        }
        return product.getName() != null &&
                product.getName().toLowerCase().contains(name.toLowerCase());
    }

    private boolean filterByCategory(Product product, String categoryId) {
        if (categoryId == null || categoryId.isBlank()) {
            return true;
        }
        return product.getCategory() != null &&
                product.getCategory().getId().equals(categoryId);
    }

    private boolean filterByAttributes(Product product, List<java.util.Map<String, String>> attributes) {
        if (attributes == null || attributes.isEmpty()) {
            return true;
        }

        // Neu san pham khong co thuoc tinh thi bo qua
        if (product.getAttributes() == null || product.getAttributes().isEmpty()) {
            return false;
        }

        // Check if all attribute filters match
        return attributes.stream().allMatch(filterAttr -> {
            String attrName = filterAttr.get("attribute_name");
            String attrValue = filterAttr.get("attribute_value");

            return product.getAttributes().stream()
                    .anyMatch(productAttr -> productAttr.getAttributeName() != null &&
                            productAttr.getAttributeName().equals(attrName) &&
                            productAttr.getAttributeValue() != null &&
                            productAttr.getAttributeValue().equals(attrValue));
        });
    }

    private boolean filterByCreator(Product product, String creatorId) {
        if (creatorId == null || creatorId.isBlank()) {
            return true; // no creator filter
        }
        if (product.getCreator() == null) {
            return false;
        }
        return creatorId.equals(product.getCreator().getId());
    }

    private List<Product> applySort(List<Product> products, ProductSearchRequest criteria) {
        String sortBy = criteria.sortBy() != null ? criteria.sortBy() : "name";
        boolean isAsc = "ASC".equalsIgnoreCase(criteria.sortOrder());

        Comparator<Product> comparator = switch (sortBy) {
            case "quantity" -> Comparator.comparing(Product::getQuantity);
            // Mac dinh sap xep theo ten tai san
            case "name" -> Comparator.comparing(t -> t.getName() != null ? t.getName() : "");
            default -> Comparator.comparing(t -> t.getName() != null ? t.getName() : "");
        };

        if (!isAsc) {
            comparator = comparator.reversed();
        }

        return products.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }

    private PageResponse<ProductResponse> applyPagination(List<Product> products,
            ProductSearchRequest criteria) {
        int page = criteria.page() != null ? criteria.page() : 0;
        int pageSize = criteria.pageSize() != null ? criteria.pageSize() : 20;

        int totalElements = products.size();
        int totalPages = (totalElements + pageSize - 1) / pageSize;

        int startIndex = Math.min(page * pageSize, totalElements);
        int endIndex = Math.min(startIndex + pageSize, totalElements);

        List<Product> pageContent = products.subList(startIndex, endIndex);
        List<ProductResponse> responseContent = productResponseMapper.toProductResponseList(pageContent);

        return new PageResponse<>(
                responseContent,
                totalPages,
                (long) totalElements,
                page,
                pageSize,
                page == 0,
                page == totalPages - 1);
    }
}
