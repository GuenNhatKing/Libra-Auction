package io.github.guennhatking.libra_auction.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.guennhatking.libra_auction.enums.auction.ApprovalStatus;
import io.github.guennhatking.libra_auction.mappers.ProductResponseMapper;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.product.Category;
import io.github.guennhatking.libra_auction.models.product.ProductImage;
import io.github.guennhatking.libra_auction.models.product.Product;
import io.github.guennhatking.libra_auction.models.product.ProductAttribute;
import io.github.guennhatking.libra_auction.repositories.auction.AuctionRepository;
import io.github.guennhatking.libra_auction.repositories.person.CustomerRepository;
import io.github.guennhatking.libra_auction.repositories.product.CategoryRepository;
import io.github.guennhatking.libra_auction.repositories.product.ProductImageRepository;
import io.github.guennhatking.libra_auction.repositories.product.ProductRepository;
import io.github.guennhatking.libra_auction.repositories.product.ProductAttributeRepository;
import io.github.guennhatking.libra_auction.viewmodels.request.AttributeRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductCreateRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;

@Service
public class ProductService {
    private final CategoryRepository danhMucRepository;
    private final ProductRepository taiSanRepository;
    private final ProductImageRepository hinhAnhTaiSanRepository;
    private final ProductAttributeRepository thuocTinhTaiSanRepository;
    private final ProductResponseMapper productResponseMapper;
    private final CustomerRepository nguoiDungRepository;

    public ProductService(CategoryRepository danhMucRepository,
            ProductRepository taiSanRepository,
            ProductImageRepository hinhAnhTaiSanRepository,
            AuctionRepository phienDauGiaRepository,
            ProductAttributeRepository thuocTinhTaiSanRepository,
            ProductResponseMapper productResponseMapper,
            CustomerRepository nguoiDungRepository) {
        this.danhMucRepository = danhMucRepository;
        this.taiSanRepository = taiSanRepository;
        this.hinhAnhTaiSanRepository = hinhAnhTaiSanRepository;
        this.thuocTinhTaiSanRepository = thuocTinhTaiSanRepository;
        this.productResponseMapper = productResponseMapper;
        this.nguoiDungRepository = nguoiDungRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getProducts() {
        List<Product> taiSanList = taiSanRepository.findAll().stream().toList();
        return productResponseMapper.toProductResponseList(taiSanList);
    }

    @Transactional(readOnly = true)
    public ProductResponse getProductById(String id) {
        Product product = taiSanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        return productResponseMapper.toProductResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductCreateRequest request, String userId) {
        System.out.println("=== SERVICE START ===");

        Customer nguoiTao = nguoiDungRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Category category = danhMucRepository.findById(request.danhMucId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        Product product = new Product(
                request.tenTaiSan(),
                request.soLuong(),
                request.moTa(),
                category);

        product.setNguoiTao(nguoiTao);
        product.setTrangThaiKiemDuyet(ApprovalStatus.CHUA_DUYET);
        Product savedProduct = taiSanRepository.save(product);

        // 1. Lưu Attributes
        if (request.attributes() != null) {
            for (AttributeRequest attr : request.attributes()) {
                if (!attr.isSystem()) {
                    ProductAttribute entity = new ProductAttribute();
                    entity.setTaiSan(savedProduct);
                    entity.setTenThuocTinh(attr.key());
                    entity.setGiaTri(attr.value());
                    thuocTinhTaiSanRepository.save(entity);
                }
            }
        }

        // 2. Lưu Hình ảnh
        if (request.imageUrls() != null && !request.imageUrls().isEmpty()) {
            int order = 0;
            for (String url : request.imageUrls()) {
                ProductImage image = new ProductImage(savedProduct, order++, url);
                hinhAnhTaiSanRepository.save(image);
                System.out.println("Saved Image URL: " + url);
            }
        }

        System.out.println("=== SERVICE DONE ===");
        return productResponseMapper.toProductResponse(savedProduct);
    }

    @Transactional
    public ProductResponse updateProduct(String id, ProductUpdateRequest request, String userId) {
        System.out.println("=== UPDATE SERVICE START (URL MODE) ===");

        // 1. Tìm và kiểm tra quyền sở hữu
        Product product = taiSanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (!userId.equals(product.getNguoiTao().getId())) {
            throw new AccessDeniedException("Bạn không có quyền chỉnh sửa tài sản này");
        }

        // 2. Tìm category mới
        Category category = danhMucRepository.findById(request.danhMucId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        // 3. Update thông tin cơ bản
        product.setTenTaiSan(request.tenTaiSan());
        product.setSoLuong(request.soLuong());
        product.setMoTa(request.moTa());
        product.setDanhMuc(category);
        Product updatedProduct = taiSanRepository.save(product);

        // 4. XỬ LÝ ATTRIBUTES: Xóa cũ, thêm mới
        thuocTinhTaiSanRepository.deleteByTaiSanId(id);
        if (request.attributes() != null) {
            for (AttributeRequest attr : request.attributes()) {
                if (!attr.isSystem()) {
                    ProductAttribute entity = new ProductAttribute();
                    entity.setTaiSan(updatedProduct);
                    entity.setTenThuocTinh(attr.key());
                    entity.setGiaTri(attr.value());
                    thuocTinhTaiSanRepository.save(entity);
                }
            }
        }

        // 5. XỬ LÝ HÌNH ẢNH
        System.out.println("=== UPDATE IMAGES ===");

        hinhAnhTaiSanRepository.deleteByTaiSanId(id);

        List<String> allImagesToSave = new ArrayList<>();
        if (request.imageUrls() != null)
            allImagesToSave.addAll(request.imageUrls());

        int order = 0;
        for (String url : allImagesToSave) {
            ProductImage image = new ProductImage(updatedProduct, order++, url);
            hinhAnhTaiSanRepository.save(image);
        }

        System.out.println("=== UPDATE DONE ===");
        return productResponseMapper.toProductResponse(updatedProduct);
    }

    @Transactional
    public void deleteProduct(String id, String userId) {
        Product product = taiSanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (!userId.equals(product.getNguoiTao().getId())) {
            throw new AccessDeniedException("Bạn không có quyền xóa tài sản này");
        }
        hinhAnhTaiSanRepository.deleteByTaiSanId(id);
        taiSanRepository.delete(product);
    }

    // ========== ADMIN APPROVAL METHODS ==========

    @Transactional
    public ProductResponse approveProduct(String id, String adminId) {
        Product product = taiSanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        product.setTrangThaiKiemDuyet(ApprovalStatus.DA_DUYET);
        Product saved = taiSanRepository.save(product);

        return productResponseMapper.toProductResponse(saved);
    }

    @Transactional
    public ProductResponse rejectProduct(String id, String adminId, String reason) {
        Product product = taiSanRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        product.setTrangThaiKiemDuyet(ApprovalStatus.BI_TU_CHOI);
        Product saved = taiSanRepository.save(product);

        return productResponseMapper.toProductResponse(saved);
    }
}