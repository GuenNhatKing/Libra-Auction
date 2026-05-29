package io.github.guennhatking.libra_auction.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.guennhatking.libra_auction.mappers.ProductResponseMapper;
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
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProducts() {
        List<Product> productList = productRepository.findAll().stream().toList();
        return productResponseMapper.toProductResponseList(productList);
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return productResponseMapper.toProductResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductCreateRequest request, String userId) {
        System.out.println("=== SERVICE START ===");

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
        Product savedProduct = productRepository.save(product);

        // 1. Luu Attributes
        if (request.attributes() != null) {
            for (AttributeRequest attr : request.attributes()) {
                if (attr.isSystem()) {
                    // Tim StandardizedAttribute trong DB
                    List<StandardizedAttribute> matches = standardizedAttributeRepository
                            .findByAttributeName(attr.key());
                    for (StandardizedAttribute sa : matches) {
                        if (sa.getAttributeValue().equals(attr.value())) {
                            AttributeCombination combination = new AttributeCombination(savedProduct, sa);
                            attributeCombinationRepository.save(combination);
                            break;
                        }
                    }
                } else {
                    ProductAttribute entity = new ProductAttribute();
                    entity.setProduct(savedProduct);
                    entity.setAttributeName(attr.key());
                    entity.setAttributeValue(attr.value());
                    productAttributeRepository.save(entity);
                }
            }
        }

        // 2. Luu Hinh anh
        if (request.imageUrls() != null && !request.imageUrls().isEmpty()) {
            int order = 0;
            for (String url : request.imageUrls()) {
                ProductImage image = new ProductImage(savedProduct, order++, url);
                productImageRepository.save(image);
                System.out.println("Saved Image URL: " + url);
            }
        }

        System.out.println("=== SERVICE DONE ===");
        return productResponseMapper.toProductResponse(savedProduct);
    }

    @Transactional
    public ProductResponse updateProduct(String id, ProductUpdateRequest request, String userId) {
        System.out.println("=== UPDATE SERVICE START (URL MODE) ===");

        // 1. Tim va kiem tra quyen so huu
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (!userId.equals(product.getCreator().getId())) {
            throw new AccessDeniedException("Ban khong co quyen chinh sua tai san nay");
        }

        // 2. Tim category moi
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        // 3. Update thong tin co ban
        product.setName(request.name());
        product.setQuantity(request.quantity());
        product.setDescription(request.description());
        product.setCategory(category);
        Product updatedProduct = productRepository.save(product);

        // 4. XU LY ATTRIBUTES: Xoa cu, them moi
        productAttributeRepository.deleteByProductId(id);
        attributeCombinationRepository.deleteAll(
                attributeCombinationRepository.findAll().stream()
                        .filter(ac -> ac.getProduct().getId().equals(id))
                        .toList());
        if (request.attributes() != null) {
            for (AttributeRequest attr : request.attributes()) {
                if (attr.isSystem()) {
                    List<StandardizedAttribute> matches = standardizedAttributeRepository
                            .findByAttributeName(attr.key());
                    for (StandardizedAttribute sa : matches) {
                        if (sa.getAttributeValue().equals(attr.value())) {
                            AttributeCombination combination = new AttributeCombination(updatedProduct, sa);
                            attributeCombinationRepository.save(combination);
                            break;
                        }
                    }
                } else {
                    ProductAttribute entity = new ProductAttribute();
                    entity.setProduct(updatedProduct);
                    entity.setAttributeName(attr.key());
                    entity.setAttributeValue(attr.value());
                    productAttributeRepository.save(entity);
                }
            }
        }

        // 5. XU LY HINH ANH
        System.out.println("=== UPDATE IMAGES ===");

        productImageRepository.deleteByProductId(id);

        List<String> allImagesToSave = new ArrayList<>();
        if (request.imageUrls() != null)
            allImagesToSave.addAll(request.imageUrls());

        int order = 0;
        for (String url : allImagesToSave) {
            ProductImage image = new ProductImage(updatedProduct, order++, url);
            productImageRepository.save(image);
        }

        System.out.println("=== UPDATE DONE ===");
        return productResponseMapper.toProductResponse(updatedProduct);
    }

    @Transactional
    public void deleteProduct(String id, String userId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (!userId.equals(product.getCreator().getId())) {
            throw new AccessDeniedException("Ban khong co quyen xoa tai san nay");
        }
        productImageRepository.deleteByProductId(id);
        productRepository.delete(product);
    }
}
