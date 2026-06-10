package io.github.guennhatking.libra_auction.controllers;

import io.github.guennhatking.libra_auction.services.ProductService;
import io.github.guennhatking.libra_auction.services.ProductSearchService;
import io.github.guennhatking.libra_auction.services.AuctionService;
import org.springframework.security.access.AccessDeniedException;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductCreateRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductSearchRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ProductSearchRequestWrapper;
import io.github.guennhatking.libra_auction.viewmodels.response.PageResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.ServerAPIResponse;
import jakarta.validation.Valid;
import io.github.guennhatking.libra_auction.security.JwtUserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService productService;
    private final ProductSearchService productSearchService;
    private final AuctionService auctionService;

    public ProductController(ProductService productService, ProductSearchService productSearchService,
            AuctionService auctionService) {
        this.productService = productService;
        this.productSearchService = productSearchService;
        this.auctionService = auctionService;
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ServerAPIResponse<ProductResponse>> getProductById(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable String id) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }
        try {
            ProductResponse response = productService.getProductByIdAndVerifyOwnership(id, userDetails.getUserId());
            return ResponseEntity.ok(ServerAPIResponse.success(response));
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ServerAPIResponse.error(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/products")
    public ResponseEntity<ServerAPIResponse<PageResponse<ProductResponse>>> getMyProducts(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            ProductSearchRequest request) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        ProductSearchRequest wrappedRequest = ProductSearchRequestWrapper.withCreatorId(request,
                userDetails.getUserId());

        PageResponse<ProductResponse> response = productSearchService.searchProducts(wrappedRequest);
        return ResponseEntity.ok(ServerAPIResponse.success(response));
    }

    @GetMapping("/public/auctions/{auction_id}/products/{product_id}")
    public ResponseEntity<ServerAPIResponse<ProductResponse>> getProductByIdInAuction(
            @PathVariable String auction_id,
            @PathVariable String product_id) {
        // Get product via auction to ensure only approved auctions and products are accessible
        try {
            ProductResponse response = auctionService.getProductFromApprovedAuction(auction_id, product_id);
            return ResponseEntity.ok(ServerAPIResponse.success(response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/products")
    public ResponseEntity<ServerAPIResponse<ProductResponse>> createProduct(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @RequestBody ProductCreateRequest request) { // Dùng @RequestBody thay cho @RequestPart

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        String userId = userDetails.getUserId();
        ProductResponse response = productService.createProduct(request, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(ServerAPIResponse.success(response));
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ServerAPIResponse<ProductResponse>> updateProduct(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable String id,
            @Valid @RequestBody ProductUpdateRequest request) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        try {
            String userId = userDetails.getUserId();
            ProductResponse response = productService.updateProduct(id, request, userId);
            return ResponseEntity.ok(ServerAPIResponse.success(response));
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ServerAPIResponse.error(e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ServerAPIResponse.error(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<ServerAPIResponse<Void>> deleteProduct(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable String id) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        try {
            String userId = userDetails.getUserId();
            productService.deleteProduct(id, userId);
            return ResponseEntity.ok(ServerAPIResponse.success(null));
        } catch (AccessDeniedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ServerAPIResponse.error(e.getMessage()));
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ServerAPIResponse.error(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }
}