package io.github.guennhatking.libra_auction.services;

import io.github.guennhatking.libra_auction.mappers.AuctionMapper;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.repositories.auction.AuctionRepository;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionSearchRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.AuctionResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.PageResponse;
import io.github.guennhatking.libra_auction.enums.auction.ApprovalStatus;
import io.github.guennhatking.libra_auction.enums.auction.AuctionStatus;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuctionSearchService {
    private final AuctionRepository auctionRepository;
    private final AuctionMapper auctionMapper;

    public AuctionSearchService(AuctionRepository auctionRepository,
            AuctionMapper auctionMapper) {
        this.auctionRepository = auctionRepository;
        this.auctionMapper = auctionMapper;
    }

    public PageResponse<AuctionResponse> searchAuctions(AuctionSearchRequest criteria) {
        // Get all non-deleted sessions
        List<Auction> allSessions = auctionRepository.findByDeletedFalse();

        // Apply filters
        List<Auction> filtered = applyFilters(allSessions, criteria);

        // Apply sorting
        filtered = applySort(filtered, criteria);

        // Apply pagination
        return applyPagination(filtered, criteria);
    }

    public PageResponse<AuctionResponse> getLiveAuctions(AuctionSearchRequest criteria) {
        return searchAuctions(criteria);
    }

    public PageResponse<AuctionResponse> getUpcomingAuctions(AuctionSearchRequest criteria) {
        return searchAuctions(criteria);
    }

    public PageResponse<AuctionResponse> getAuctionsByCategory(AuctionSearchRequest criteria) {
        return searchAuctions(criteria);
    }

    /**
     * Search only approved auctions for public viewing
     */
    public PageResponse<AuctionResponse> searchPublicAuctions(AuctionSearchRequest baseCriteria) {
        // Force approval status to APPROVED for public
        AuctionSearchRequest criteria = new AuctionSearchRequest(
                baseCriteria.name(),
                baseCriteria.categoryId(),
                baseCriteria.priceFrom(),
                baseCriteria.priceTo(),
                baseCriteria.startingPrice(),
                baseCriteria.timeStart(),
                baseCriteria.timeEnd(),
                baseCriteria.attributes(),
                baseCriteria.status(),
                ApprovalStatus.APPROVED.toString(),
                baseCriteria.page(),
                baseCriteria.pageSize(),
                baseCriteria.sortBy(),
                baseCriteria.sortOrder(),
                null);

        return searchAuctions(criteria);
    }

    /**
     * Search pending auctions (PENDING_APPROVAL) for admin
     */
    public PageResponse<AuctionResponse> searchPendingAuctions(AuctionSearchRequest baseCriteria) {
        // Force approval status to PENDING_APPROVAL for admin pending view
        AuctionSearchRequest criteria = new AuctionSearchRequest(
                baseCriteria.name(),
                baseCriteria.categoryId(),
                baseCriteria.priceFrom(),
                baseCriteria.priceTo(),
                baseCriteria.startingPrice(),
                baseCriteria.timeStart(),
                baseCriteria.timeEnd(),
                baseCriteria.attributes(),
                AuctionStatus.UPCOMING.toString(),
                ApprovalStatus.PENDING_APPROVAL.toString(),
                baseCriteria.page(),
                baseCriteria.pageSize(),
                baseCriteria.sortBy(),
                baseCriteria.sortOrder(),
                null);

        return searchAuctions(criteria);
    }

    private List<Auction> applyFilters(List<Auction> sessions, AuctionSearchRequest criteria) {
        return sessions.stream()
                .filter(session -> filterByName(session, criteria.name()))
                .filter(session -> filterByCategory(session, criteria.categoryId()))
                .filter(session -> filterByPriceRange(session, criteria.priceFrom(), criteria.priceTo()))
                .filter(session -> filterByStartingPrice(session, criteria.startingPrice()))
                .filter(session -> filterByTimeRange(session, criteria.timeStart(), criteria.timeEnd()))
                .filter(session -> filterByStatus(session, criteria.status()))
                .filter(session -> filterByOwner(session, criteria.ownerId()))
                .filter(session -> filterByApprovalStatus(session, criteria.approvalStatus(), criteria.ownerId()))
                .filter(session -> filterByAttributes(session, criteria.attributes()))
                .collect(Collectors.toList());
    }


    private boolean filterByName(Auction session, String name) {
        if (name == null || name.isBlank()) {
            return true;
        }
        return session.getProduct() != null &&
                session.getProduct().getName() != null &&
                session.getProduct().getName().toLowerCase().contains(name.toLowerCase());
    }

    private boolean filterByCategory(Auction session, String categoryId) {
        if (categoryId == null || categoryId.isBlank()) {
            return true;
        }
        return session.getProduct() != null &&
                session.getProduct().getCategory() != null &&
                session.getProduct().getCategory().getId().equals(categoryId);
    }

    private boolean filterByPriceRange(Auction session, Long priceFrom, Long priceTo) {
        if (priceFrom == null && priceTo == null) {
            return true;
        }

        long currentPrice = session.getCurrentPrice() != 0 ? session.getCurrentPrice() : session.getStartingPrice();

        if (priceFrom != null && currentPrice < priceFrom) {
            return false;
        }
        if (priceTo != null && currentPrice > priceTo) {
            return false;
        }

        return true;
    }

    private boolean filterByStartingPrice(Auction session, Long startingPrice) {
        if (startingPrice == null) {
            return true;
        }
        return session.getStartingPrice() == startingPrice;
    }

    private boolean filterByTimeRange(Auction session, OffsetDateTime timeStart, OffsetDateTime timeEnd) {
        if (timeStart == null && timeEnd == null) {
            return true;
        }

        OffsetDateTime sessionTime = session.getStartTime();

        if (timeStart != null && sessionTime.isBefore(timeStart)) {
            return false;
        }
        if (timeEnd != null && sessionTime.isAfter(timeEnd)) {
            return false;
        }

        return true;
    }

    private boolean filterByStatus(Auction session, String status) {
        if (status == null || status.isBlank()) {
            return true;
        }
        return session.getAuctionStatus() != null &&
                session.getAuctionStatus().toString().equals(status);
    }

    private boolean filterByAttributes(Auction session, List<java.util.Map<String, String>> attributes) {

        if (attributes == null || attributes.isEmpty()) {
            return true;
        }

        if (session.getProduct() == null) {
            return false;
        }

        // Check if all attribute filters match against either custom or standardized attributes
        return attributes.stream().allMatch(filterAttr -> {
            String attrName = filterAttr.get("attribute_name");
            String attrValue = filterAttr.get("attribute_value");

            // Check custom attributes (ProductAttribute)
            boolean matchesCustom = session.getProduct().getAttributes() != null &&
                    session.getProduct().getAttributes().stream()
                            .anyMatch(productAttr -> productAttr.getAttributeName() != null &&
                                    productAttr.getAttributeName().equals(attrName) &&
                                    productAttr.getAttributeValue() != null &&
                                    productAttr.getAttributeValue().equals(attrValue));

            if (matchesCustom) return true;

            // Check standardized attributes (AttributeCombination -> StandardizedAttribute)
            return session.getProduct().getAttributeCombinations() != null &&
                    session.getProduct().getAttributeCombinations().stream()
                            .anyMatch(combo -> combo.getStandardizedAttribute() != null &&
                                    combo.getStandardizedAttribute().getAttributeName() != null &&
                                    combo.getStandardizedAttribute().getAttributeName().equals(attrName) &&
                                    combo.getStandardizedAttribute().getAttributeValue() != null &&
                                    combo.getStandardizedAttribute().getAttributeValue().equals(attrValue));
        });
    }

    private boolean filterByOwner(Auction session, String ownerId) {
        if (ownerId == null || ownerId.isBlank()) {
            return true; // no owner filter
        }
        if (session.getCreator() == null) {
            return false;
        }
        return ownerId.equals(session.getCreator().getId());
    }

    private boolean filterByApprovalStatus(Auction session, String approvalStatusFilter, String ownerId) {
        // If a specific approval status filter is specified (e.g., admin filtering), apply it
        if (approvalStatusFilter != null && !approvalStatusFilter.isBlank()) {
            if (session.getApprovalStatus() == null) {
                return false;
            }
            return session.getApprovalStatus().toString().equals(approvalStatusFilter);
        }

        // If seller is viewing their own auctions (ownerId is set), show all their auctions
        // regardless of approval status
        if (ownerId != null && !ownerId.isBlank()) {
            return true;
        }

        // For public/unauthenticated users, only show approved auctions
        return session.getApprovalStatus() != null &&
               session.getApprovalStatus().equals(ApprovalStatus.APPROVED);
    }

    private List<Auction> applySort(List<Auction> sessions, AuctionSearchRequest criteria) {
        String sortBy = criteria.sortBy() != null ? criteria.sortBy() : "startTime";
        boolean isAsc = "ASC".equalsIgnoreCase(criteria.sortOrder());

        Comparator<Auction> comparator = switch (sortBy) {
            case "startingPrice" -> Comparator.comparing(Auction::getStartingPrice);
            case "currentPrice" -> Comparator.comparing(Auction::getCurrentPrice);
            case "startTime" -> Comparator.comparing(Auction::getStartTime);
            default -> Comparator.comparing(Auction::getStartTime);
        };

        if (!isAsc) {
            comparator = comparator.reversed();
        }

        return sessions.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }

    private PageResponse<AuctionResponse> applyPagination(List<Auction> sessions,
            AuctionSearchRequest criteria) {
        int page = criteria.page() != null ? criteria.page() : 0;
        int pageSize = criteria.pageSize() != null ? criteria.pageSize() : 20;

        int totalElements = sessions.size();
        int totalPages = (totalElements + pageSize - 1) / pageSize;

        int startIndex = Math.min(page * pageSize, totalElements);
        int endIndex = Math.min(startIndex + pageSize, totalElements);

        List<Auction> pageContent = sessions.subList(startIndex, endIndex);
        List<AuctionResponse> responseContent = auctionMapper.toAuctionResponseList(pageContent);

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
