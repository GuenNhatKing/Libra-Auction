package io.github.guennhatking.libra_auction.services;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.guennhatking.libra_auction.enums.auction.AuctionStatus;
import io.github.guennhatking.libra_auction.enums.product.ProductStatus;
import io.github.guennhatking.libra_auction.mappers.ProductResponseMapper;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.product.Category;
import io.github.guennhatking.libra_auction.models.product.ProductImage;
import io.github.guennhatking.libra_auction.models.product.AttributeCombination;
import io.github.guennhatking.libra_auction.models.product.Product;
import io.github.guennhatking.libra_auction.models.product.ProductAttribute;
import io.github.guennhatking.libra_auction.models.product.StandardizedAttribute;
import io.github.guennhatking.libra_auction.repositories.auction.AuctionRepository;
import io.github.guennhatking.libra_auction.repositories.person.CustomerRepository;
import io.github.guennhatking.libra_auction.repositories.product.AttributeCombinationRepository;
import io.github.guennhatking.libra_auction.repositories.product.CategoryRepository;
import io.github.guennhatking.libra_auction.repositories.product.ProductImageRepository;
import io.github.guennhatking.libra_auction.repositories.product.ProductRepository;
import io.github.guennhatking.libra_auction.repositories.product.ProductAttributeRepository;
import io.github.guennhatking.libra_auction.repositories.product.StandardizedAttributeRepository;
import io.github.guennhatking.libra_auction.viewmodels.request.AttributeRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductCreateRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;

@Service
public class ProductService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductAttributeRepository productAttributeRepository;
    private final StandardizedAttributeRepository standardizedAttributeRepository;
    private final AttributeCombinationRepository attributeCombinationRepository;
    private final ProductResponseMapper productResponseMapper;
    private final CustomerRepository customerRepository;
    private final AuctionRepository auctionRepository;

    public ProductService(CategoryRepository categoryRepository,
            ProductRepository productRepository,
            ProductImageRepository productImageRepository,
            AuctionRepository auctionRepository,
            ProductAttributeRepository productAttributeRepository,
            StandardizedAttributeRepository standardizedAttributeRepository,
            AttributeCombinationRepository attributeCombinationRepository,
            ProductResponseMapper productResponseMapper,
            CustomerRepository customerRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productAttributeRepository = productAttributeRepository;
        this.standardizedAttributeRepository = standardizedAttributeRepository;
        this.attributeCombinationRepository = attributeCombinationRepository;
        this.productResponseMapper = productResponseMapper;
        this.customerRepository = customerRepository;
        this.auctionRepository = auctionRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProducts() {
        return productResponseMapper.toProductResponseList(productRepository.findByLatestVersionTrueAndDeletedFalse());
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(id)
                .filter(Product::isLatestVersion)
                .filter(productItem -> !productItem.isDeleted())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return productResponseMapper.toProductResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductCreateRequest request, String userId) {
        Customer creator = customerRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        Product product = new Product(
                request.name(),
                request.quantity(),
                request.description(),
                category);

        product.setCreator(creator);
        product.setVersionCreatedAt(OffsetDateTime.now(ZoneOffset.ofHours(7)));
        product.setLatestVersion(true);
        product.setDeleted(false);
        Product savedProduct = productRepository.save(product);
        savedProduct.setRootProductId(savedProduct.getId());
        savedProduct = productRepository.save(savedProduct);

        saveAttributes(savedProduct, request.attributes());
        saveImages(savedProduct, request.imageUrls());

        return productResponseMapper.toProductResponse(savedProduct);
    }

    @Transactional
    public ProductResponse updateProduct(String id, ProductUpdateRequest request, String userId) {
        Product product = productRepository.findById(id)
                .filter(Product::isLatestVersion)
                .filter(productItem -> !productItem.isDeleted())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (!userId.equals(product.getCreator().getId())) {
            throw new AccessDeniedException("You do not have permission to edit this product");
        }

        if (product.getStatus() != ProductStatus.AVAILABLE) {
            throw new IllegalStateException("Can only edit products with available status");
        }

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (!auctionRepository.existsByProduct(product)) {
            applyProductUpdate(product, request, category);
            Product updatedProduct = productRepository.save(product);
            replaceProductDetails(updatedProduct, request.attributes(), request.imageUrls());
            return productResponseMapper.toProductResponse(updatedProduct);
        }

        product.setLatestVersion(false);
        productRepository.save(product);

        Product newVersion = new Product(request.name(), request.quantity(), request.description(), category);
        newVersion.setCreator(product.getCreator());
        newVersion.setStatus(product.getStatus());
        newVersion.setRootProductId(product.getRootProductId() == null ? product.getId() : product.getRootProductId());
        newVersion.setVersionCreatedAt(OffsetDateTime.now(ZoneOffset.ofHours(7)));
        newVersion.setLatestVersion(true);
        newVersion.setDeleted(false);
        Product savedNewVersion = productRepository.save(newVersion);
        replaceProductDetails(savedNewVersion, request.attributes(), request.imageUrls());

        return productResponseMapper.toProductResponse(savedNewVersion);
    }

    @Transactional
    public void deleteProduct(String id, String userId) {
        Product product = productRepository.findById(id)
                .filter(Product::isLatestVersion)
                .filter(productItem -> !productItem.isDeleted())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (!userId.equals(product.getCreator().getId())) {
            throw new AccessDeniedException("You do not have permission to delete this product");
        }
        if (product.getStatus() != ProductStatus.AVAILABLE) {
            throw new IllegalStateException("Can only delete products with available status");
        }

        String rootProductId = product.getRootProductId() == null ? product.getId() : product.getRootProductId();
        List<Product> versions = productRepository.findByRootProductId(rootProductId);
        List<Auction> relatedAuctions = auctionRepository.findByProductIn(versions);

        boolean hasCompletedAuction = relatedAuctions.stream()
                .anyMatch(auction -> auction.getAuctionStatus() == AuctionStatus.COMPLETED);
        if (hasCompletedAuction) {
            throw new IllegalStateException("Cannot delete a product that has been sold successfully");
        }

        boolean hasNonTerminalAuction = relatedAuctions.stream()
                .anyMatch(auction -> auction.getAuctionStatus() != AuctionStatus.FAILED);
        if (hasNonTerminalAuction) {
            throw new IllegalStateException("Can only delete when all related auctions have failed");
        }

        product.setDeleted(true);
        product.setDeletedAt(OffsetDateTime.now(ZoneOffset.ofHours(7)));
        productRepository.save(product);
    }

    private void applyProductUpdate(Product product, ProductUpdateRequest request, Category category) {
        product.setName(request.name());
        product.setQuantity(request.quantity());
        product.setDescription(request.description());
        product.setCategory(category);
    }

    private void replaceProductDetails(Product product, List<AttributeRequest> attributes, List<String> imageUrls) {
        productAttributeRepository.deleteByProductId(product.getId());
        attributeCombinationRepository.deleteByProductId(product.getId());
        productImageRepository.deleteByProductId(product.getId());
        saveAttributes(product, attributes);
        saveImages(product, imageUrls);
    }

    private void saveAttributes(Product product, List<AttributeRequest> attributes) {
        if (attributes == null) {
            return;
        }

        for (AttributeRequest attr : attributes) {
            if (attr.isSystem()) {
                List<StandardizedAttribute> matches = standardizedAttributeRepository.findByAttributeName(attr.key());
                for (StandardizedAttribute sa : matches) {
                    if (sa.getAttributeValue().equals(attr.value())) {
                        AttributeCombination combination = new AttributeCombination(product, sa);
                        attributeCombinationRepository.save(combination);
                        break;
                    }
                }
            } else {
                ProductAttribute entity = new ProductAttribute();
                entity.setProduct(product);
                entity.setAttributeName(attr.key());
                entity.setAttributeValue(attr.value());
                productAttributeRepository.save(entity);
            }
        }
    }

    private void saveImages(Product product, List<String> imageUrls) {
        List<String> allImagesToSave = new ArrayList<>();
        if (imageUrls != null) {
            allImagesToSave.addAll(imageUrls);
        }

        int order = 0;
        for (String url : allImagesToSave) {
            ProductImage image = new ProductImage(product, order++, url);
            productImageRepository.save(image);
        }
    }
}
