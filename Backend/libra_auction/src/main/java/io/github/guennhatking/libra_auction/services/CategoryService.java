package io.github.guennhatking.libra_auction.services;

import io.github.guennhatking.libra_auction.repositories.product.CategoryRepository;
import io.github.guennhatking.libra_auction.viewmodels.response.CategoryResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategories() {
        return categoryRepository.findAll().stream()
            .map(category -> new CategoryResponse(
                category.getId(),
                category.getImageUrl(),
                category.getName()
            ))
            .toList();
    }
}
