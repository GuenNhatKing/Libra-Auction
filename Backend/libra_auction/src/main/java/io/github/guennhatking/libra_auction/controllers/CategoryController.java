package io.github.guennhatking.libra_auction.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import io.github.guennhatking.libra_auction.dto.response.CategoryResponse;
import io.github.guennhatking.libra_auction.service.CategoryService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Validated
@Slf4j
public class CategoryController {
    CategoryService categoryService;

    /**
     * Get all categories
     * GET /api/categories
     */
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        log.info("Fetching all categories");
        List<CategoryResponse> response = categoryService.getAllCategories();
        return ResponseEntity.ok(response);
    }

    /**
     * Get category by ID
     * GET /api/categories/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategory(@PathVariable String id) {
        log.info("Fetching category with id: {}", id);
        CategoryResponse response = categoryService.getCategory(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Insert test data (for development only)
     * POST /api/categories/test-insert
     */
    @PostMapping("/test-insert")
    public ResponseEntity<List<CategoryResponse>> insertTestData() {
        log.info("Inserting test categories");
        List<CategoryResponse> result = categoryService.insertTestData();
        return ResponseEntity.ok(result);
    }
}
