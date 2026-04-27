package io.github.guennhatking.libra_auction.controllers;

import io.github.guennhatking.libra_auction.services.ProductService;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductCreateRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponse> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(
            @RequestPart("data") ProductCreateRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        System.out.println("CONTROLLER HIT");

        System.out.println("tenTaiSan: " + request.tenTaiSan());
        System.out.println("soLuong: " + request.soLuong());

        System.out.println("Images count: " + (images != null ? images.size() : 0));

        return productService.createProduct(request, images);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ProductResponse updateProduct(
            @PathVariable String id,
            @RequestPart("data") ProductUpdateRequest request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        System.out.println("=== UPDATE CONTROLLER HIT ===");

        System.out.println("ID: " + id);
        System.out.println("tenTaiSan: " + request.tenTaiSan());
        System.out.println("soLuong: " + request.soLuong());
        System.out.println("Existing images: " +
                (request.existingImages() != null ? request.existingImages().size() : 0));
        System.out.println("New images: " +
                (images != null ? images.size() : 0));

        return productService.updateProduct(id, request, images);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }
}
