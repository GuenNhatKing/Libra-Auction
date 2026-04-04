package io.github.guennhatking.libra_auction.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.guennhatking.libra_auction.dto.response.CategoryResponse;
import io.github.guennhatking.libra_auction.exception.AppException;
import io.github.guennhatking.libra_auction.exception.ErrorCode;
import io.github.guennhatking.libra_auction.repos.DanhMucRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CategoryService {
    DanhMucRepository danhMucRepository;

    private CategoryResponse toCategoryResponse(io.github.guennhatking.libra_auction.models.DanhMuc danhMuc) {
        return CategoryResponse.builder()
                .id(danhMuc.getId())
                .tenDanhMuc(danhMuc.getTenDanhMuc())
                .hinhAnh(danhMuc.getHinhAnh())
                .build();
    }

    public List<CategoryResponse> getAllCategories() {
        log.info("Fetching all categories");
        return danhMucRepository.findAll().stream()
                .map(this::toCategoryResponse)
                .toList();
    }

    public CategoryResponse getCategory(String id) {
        log.info("Fetching category with id: {}", id);
        var danhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RESOURCE_NOT_FOUND));
        
        return toCategoryResponse(danhMuc);
    }

    public List<CategoryResponse> insertTestData() {
        log.info("Inserting test categories");
        var existingCategories = danhMucRepository.findAll();
        if (!existingCategories.isEmpty()) {
            log.info("Categories already exist, returning existing data");
            return existingCategories.stream().map(this::toCategoryResponse).toList();
        }

        var cat1 = new io.github.guennhatking.libra_auction.models.DanhMuc();
        cat1.setTenDanhMuc("Electronics");
        cat1.setHinhAnh("https://example.com/electronics.jpg");

        var cat2 = new io.github.guennhatking.libra_auction.models.DanhMuc();
        cat2.setTenDanhMuc("Jewelry");
        cat2.setHinhAnh("https://example.com/jewelry.jpg");

        var cat3 = new io.github.guennhatking.libra_auction.models.DanhMuc();
        cat3.setTenDanhMuc("Art");
        cat3.setHinhAnh("https://example.com/art.jpg");

        var cat4 = new io.github.guennhatking.libra_auction.models.DanhMuc();
        cat4.setTenDanhMuc("Collectibles");
        cat4.setHinhAnh("https://example.com/collectibles.jpg");

        return danhMucRepository.saveAll(List.of(cat1, cat2, cat3, cat4)).stream()
                .map(this::toCategoryResponse)
                .toList();
    }
}
