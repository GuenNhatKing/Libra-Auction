package io.github.guennhatking.libra_auction.controllers;

import io.github.guennhatking.libra_auction.enums.auction.TrangThaiPhien;
import io.github.guennhatking.libra_auction.services.AuctionSearchService;
import io.github.guennhatking.libra_auction.services.AuctionService;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionCreateRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionSearchRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.AuctionResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.PageResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/api/auctions")
public class AuctionController {
    private final AuctionService auctionService;
    private final AuctionSearchService searchService;

    public AuctionController(AuctionService auctionService,
            AuctionSearchService searchService) {
        this.auctionService = auctionService;
        this.searchService = searchService;
    }

    @GetMapping
    public List<AuctionResponse> getAuctions() {
        return auctionService.getAuctions();
    }

    @GetMapping("/{id}")
    public AuctionResponse getAuctionById(@PathVariable String id) {
        return auctionService.getAuctionById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AuctionResponse createAuction(
            @RequestBody(required = false) AuctionCreateRequest request) {
        return auctionService.createAuction(request);
    }

    @PutMapping("/{id}")
    public AuctionResponse updateAuction(@PathVariable String id,
            @Valid @RequestBody AuctionUpdateRequest request) {
        return auctionService.updateAuction(id, request);
    }

    /**
     * Search all auction sessions with flexible criteria
     * GET
     * /api/auction-sessions/search?name=abc&categoryId=123&priceFrom=100&priceTo=1000&page=0&pageSize=20
     * 
     * Tìm kiếm tất cả phiên đấu giá với tiêu chí linh hoạt
     */
    @GetMapping("/search")
    public PageResponse<AuctionResponse> searchAuctions(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String categoryId,
            @RequestParam(required = false) Long priceFrom,
            @RequestParam(required = false) Long priceTo,
            @RequestParam(required = false) Long startingPrice,
            @RequestParam(required = false) String timeStart,
            @RequestParam(required = false) String timeEnd,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer pageSize,
            @RequestParam(defaultValue = "thoiGianBatDau") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortOrder) {

        AuctionSearchRequest criteria = buildSearchCriteria(
                name, categoryId, priceFrom, priceTo, startingPrice,
                timeStart, timeEnd, status, page, pageSize, sortBy, sortOrder);

        return searchService.searchAuctions(criteria);
    }

    /**
     * Get live auction sessions (DANG_DIEN_RA)
     * GET /api/auction-sessions/live?page=0&pageSize=20
     * 
     * Lấy phiên đấu giá đang diễn ra
     */
    @GetMapping("/live")
    public PageResponse<AuctionResponse> getLiveAuctions(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String categoryId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer pageSize,
            @RequestParam(defaultValue = "thoiGianBatDau") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortOrder) {

        AuctionSearchRequest criteria = buildSearchCriteria(
                name, // 1. name
                categoryId, // 2. categoryId
                null, // 3. priceFrom
                null, // 4. priceTo
                null, // 5. startingPrice
                null, // 6. timeStart (String)
                null, // 7. timeEnd (String)
                TrangThaiPhien.DANG_DIEN_RA.toString(), // 8. status
                page, // 9. page
                pageSize, // 10. pageSize
                sortBy, // 11. sortBy
                sortOrder // 12. sortOrder
        );

        return searchService.getLiveAuctions(criteria);
    }

    /**
     * Get upcoming auction sessions (CHUA_BAT_DAU)
     * GET /api/auction-sessions/upcoming?page=0&pageSize=20
     * 
     * Lấy phiên đấu giá sắp tới
     */
    @GetMapping("/upcoming")
    public PageResponse<AuctionResponse> getUpcomingAuctions(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String categoryId,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer pageSize,
            @RequestParam(defaultValue = "thoiGianBatDau") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortOrder) {

        // Gán trực tiếp CHUA_BAT_DAU vào tham số status
        AuctionSearchRequest criteria = buildSearchCriteria(
                name,
                categoryId,
                null,
                null,
                null, // price range
                null,
                null, // time range
                TrangThaiPhien.CHUA_BAT_DAU.toString(),
                page, pageSize, sortBy, sortOrder);

        return searchService.getUpcomingAuctions(criteria);
    }

    /**
     * Get auction sessions by category (live or upcoming)
     * GET /api/auction-sessions/category/{categoryId}/live?page=0&pageSize=20
     * GET /api/auction-sessions/category/{categoryId}/upcoming?page=0&pageSize=20
     * 
     * Lấy phiên đấu giá theo danh mục (đang diễn ra hoặc sắp tới)
     */
    @GetMapping("/category/{categoryId}/{type}")
    public PageResponse<AuctionResponse> getAuctionsByCategory(
            @PathVariable String categoryId,
            @PathVariable String type,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer pageSize,
            @RequestParam(defaultValue = "thoiGianBatDau") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortOrder) {

        // Xác định status dựa trên path variable 'type'
        String status = null;
        if ("live".equalsIgnoreCase(type)) {
            status = TrangThaiPhien.DANG_DIEN_RA.toString();
        } else if ("upcoming".equalsIgnoreCase(type)) {
            status = TrangThaiPhien.CHUA_BAT_DAU.toString();
        }

        AuctionSearchRequest criteria = buildSearchCriteria(
                name,
                categoryId, 
                null, 
                null, 
                null,
                null, 
                null,
                status, // Truyền status vừa xác định
                page, pageSize, sortBy, sortOrder);

        return searchService.getAuctionsByCategory(criteria);
    }

    /**
     * Build search criteria from request parameters
     */
    private AuctionSearchRequest buildSearchCriteria(
            String name, String categoryId, Long priceFrom, Long priceTo, Long startingPrice,
            String timeStart, String timeEnd, String status,
            Integer page, Integer pageSize, String sortBy, String sortOrder) {

        // Logic parse thời gian
        LocalDateTime parsedStart = parseDateTime(timeStart);
        LocalDateTime parsedEnd = parseDateTime(timeEnd);

        // Gọi constructor của Record (PHẢI ĐỦ 13 THAM SỐ theo định nghĩa Record)
        return new AuctionSearchRequest(
                name,
                categoryId,
                priceFrom,
                priceTo,
                startingPrice,
                parsedStart,
                parsedEnd,
                null,
                status,
                page,
                pageSize,
                sortBy,
                sortOrder);
    }

    private LocalDateTime parseDateTime(String dateTimeStr) {
        if (dateTimeStr == null || dateTimeStr.isBlank()) {
            return null;
        }
        try {
            return LocalDateTime.parse(dateTimeStr, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        } catch (DateTimeParseException e) {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAuction(@PathVariable String id) {
        auctionService.deleteAuction(id);
    }
}
