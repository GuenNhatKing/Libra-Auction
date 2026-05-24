package io.github.guennhatking.libra_auction.services;

import io.github.guennhatking.libra_auction.enums.auction.ApprovalStatus;
import io.github.guennhatking.libra_auction.enums.auction.AuctionStatus;
import io.github.guennhatking.libra_auction.mappers.AuctionMapper;
import io.github.guennhatking.libra_auction.mappers.ProductResponseMapper;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.product.Product;
import io.github.guennhatking.libra_auction.repositories.auction.AuctionRepository;
import io.github.guennhatking.libra_auction.repositories.person.CustomerRepository;
import io.github.guennhatking.libra_auction.repositories.product.ProductRepository;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionCreateRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.AuctionResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.ProductResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Comparator;
import java.util.List;

@Service
public class AuctionService {
        private final AuctionRepository phienDauGiaRepository;
        private final AuctionMapper auctionMapper;
        private final ProductResponseMapper productResponseMapper;
        private final ProductRepository taiSanRepository;
        private final CustomerRepository nguoiDungRepository;
        private final AuctionStateRedisService auctionStateRedisService;

        public AuctionService(AuctionRepository phienDauGiaRepository,
                        AuctionMapper auctionMapper,
                        ProductResponseMapper productResponseMapper,
                        ProductRepository taiSanRepository,
                        CustomerRepository nguoiDungRepository,
                        AuctionStateRedisService auctionStateRedisService) {
                this.phienDauGiaRepository = phienDauGiaRepository;
                this.auctionMapper = auctionMapper;
                this.productResponseMapper = productResponseMapper;
                this.taiSanRepository = taiSanRepository;
                this.nguoiDungRepository = nguoiDungRepository;
                this.auctionStateRedisService = auctionStateRedisService;
        }

        @Transactional(readOnly = true)
        public List<AuctionResponse> getAuctions() {
                List<Auction> phienDauGiaList = phienDauGiaRepository.findAll().stream()
                                .sorted(Comparator.comparing(Auction::getThoiGianTao,
                                                Comparator.nullsLast(Comparator.reverseOrder())))
                                .toList();
                return auctionMapper.toAuctionResponseList(phienDauGiaList);
        }

        @Transactional(readOnly = true)
        public AuctionResponse getAuctionById(String id) {
                Auction session = phienDauGiaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));
                // For public endpoint, only return approved auctions
                if (session.getTrangThaiKiemDuyet() != ApprovalStatus.DA_DUYET) {
                        throw new IllegalArgumentException("Auction session not found");
                }
                return auctionMapper.toAuctionResponse(session);
        }

        @Transactional(readOnly = true)
        public AuctionResponse getAuctionById(String id, String userId) {
                Auction session = phienDauGiaRepository.findByIdAndNguoiTao_Id(id, userId)
                                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));

                return auctionMapper.toAuctionResponse(session);
        }

        @Transactional(readOnly = true)
        public AuctionResponse getAuctionByIdAndCategory(String id, String categoryId) {
                Auction session = phienDauGiaRepository
                                .findByIdAndTaiSan_DanhMuc_Id(id, categoryId)
                                .orElseThrow(() -> new IllegalArgumentException(
                                                "Auction not found in this category"));
                // For public endpoint, only return approved auctions
                if (session.getTrangThaiKiemDuyet() != ApprovalStatus.DA_DUYET) {
                        throw new IllegalArgumentException("Auction not found in this category");
                }
                return auctionMapper.toAuctionResponse(session);
        }

        @Transactional
        public AuctionResponse createAuction(AuctionCreateRequest request, String userId) {
                Product product = taiSanRepository.findById(request.taiSanId())
                                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

                Customer nguoiTao = nguoiDungRepository.findById(userId)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

                Auction session = new Auction();
                session.setThoiGianTao(OffsetDateTime.now(ZoneOffset.ofHours(7)));
                session.setNguoiTao(nguoiTao);
                session.setTaiSan(product);
                session.setThoiLuong(request.thoiLuong());
                session.setThoiGianBatDau(request.thoiGianBatDau());
                session.setGiaKhoiDiem(request.giaKhoiDiem());
                session.setBuocGiaNhoNhat(request.buocGiaNhoNhat());
                session.setTienCoc(request.tienCoc());
                session.setTrangThaiKiemDuyet(ApprovalStatus.CHUA_DUYET);
                session.setTrangThaiPhien(AuctionStatus.CHUA_BAT_DAU);


                Auction savedSession = phienDauGiaRepository.save(session);

                return auctionMapper.toAuctionResponse(savedSession);
        }

        @Transactional
        public AuctionResponse updateAuction(String id, AuctionUpdateRequest request, String userId) {
                Customer nguoiTao = nguoiDungRepository.findById(userId)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

                Auction session = phienDauGiaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));

                if (!nguoiTao.getId().equals(session.getNguoiTao().getId())) {
                        throw new AccessDeniedException("You do not have permission to edit this auction.");
                }

                session.setThoiGianBatDau(request.thoiGianBatDau());
                session.setThoiLuong(request.thoiLuong());
                session.setGiaKhoiDiem(request.giaKhoiDiem());
                session.setBuocGiaNhoNhat(request.buocGiaNhoNhat());
                session.setTienCoc(request.tienCoc());

                Auction updatedSession = phienDauGiaRepository.save(session);

                // If auction is already approved, update Redis scheduling
                if (updatedSession.getTrangThaiKiemDuyet() == ApprovalStatus.DA_DUYET) {
                        auctionStateRedisService.removeAuctionStartEvent(id);
                        auctionStateRedisService.removeAuctionEndEvent(id);
                        
                        if (updatedSession.getThoiGianBatDau() != null) {
                                auctionStateRedisService.addAuctionStartEvent(updatedSession.getId(), updatedSession.getThoiGianBatDau());
                                auctionStateRedisService.addAuctionEndEvent(updatedSession.getId(), 
                                        updatedSession.getThoiGianBatDau().plusSeconds(updatedSession.getThoiLuong()));
                        }
                }

                return auctionMapper.toAuctionResponse(updatedSession);
        }

        @Transactional
        public void deleteAuction(String id, String userId) {
                Customer nguoiTao = nguoiDungRepository.findById(userId)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

                Auction session = phienDauGiaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));

                if (!nguoiTao.getId().equals(session.getNguoiTao().getId())) {
                        throw new AccessDeniedException("Bạn không có quyền xóa phiên đấu giá này");
                }

                // Clean up Redis scheduling when deleting
                auctionStateRedisService.removeAuctionStartEvent(id);
                auctionStateRedisService.removeAuctionEndEvent(id);

                phienDauGiaRepository.delete(session);
        }

        // ========== ADMIN APPROVAL METHODS ==========

        @Transactional
        public AuctionResponse approveAuction(String id, String adminId) {
                Auction session = phienDauGiaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));

                session.setTrangThaiKiemDuyet(ApprovalStatus.DA_DUYET);
                Auction saved = phienDauGiaRepository.save(session);

                // Register the auction in Redis for automatic start/end scheduling
                if (saved.getThoiGianBatDau() != null) {
                        auctionStateRedisService.addAuctionStartEvent(saved.getId(), saved.getThoiGianBatDau());
                        // Calculate end time: start_time + duration
                        auctionStateRedisService.addAuctionEndEvent(saved.getId(), 
                                saved.getThoiGianBatDau().plusSeconds(saved.getThoiLuong()));
                }

                return auctionMapper.toAuctionResponse(saved);
        }

        @Transactional
        public AuctionResponse rejectAuction(String id, String adminId, String reason) {
                Auction session = phienDauGiaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));

                session.setTrangThaiKiemDuyet(ApprovalStatus.BI_TU_CHOI);
                Auction saved = phienDauGiaRepository.save(session);

                // Clean up Redis scheduling when rejecting
                auctionStateRedisService.removeAuctionStartEvent(id);
                auctionStateRedisService.removeAuctionEndEvent(id);

                return auctionMapper.toAuctionResponse(saved);
        }

        /**
         * Register all existing approved but not-yet-started auctions in Redis.
         * This is useful after deploying the fix to retroactively register auctions
         * that were approved before Redis integration was added.
         * @return Number of auctions registered
         */
        public int registerExistingAuctionsToRedis() {
                List<Auction> approvedNotStarted = phienDauGiaRepository.findByTrangThaiPhien(AuctionStatus.CHUA_BAT_DAU);
                int count = 0;
                
                for (Auction auction : approvedNotStarted) {
                        if (auction.getTrangThaiKiemDuyet() == ApprovalStatus.DA_DUYET && 
                            auction.getThoiGianBatDau() != null) {
                                try {
                                        auctionStateRedisService.addAuctionStartEvent(auction.getId(), auction.getThoiGianBatDau());
                                        auctionStateRedisService.addAuctionEndEvent(auction.getId(), 
                                                auction.getThoiGianBatDau().plusSeconds(auction.getThoiLuong()));
                                        count++;
                                } catch (Exception e) {
                                        // Log and continue with next auction
                                }
                        }
                }
                
                return count;
        }

        // ========== PUBLIC PRODUCT RETRIEVAL METHODS ==========
        // Get product from an approved auction to ensure security

        @Transactional(readOnly = true)
        public ProductResponse getProductFromApprovedAuction(
                        String auctionId, String productId) {
                Auction session = phienDauGiaRepository.findById(auctionId)
                                .orElseThrow(() -> new IllegalArgumentException("Auction not found"));

                // Verify auction is approved
                if (session.getTrangThaiKiemDuyet() != ApprovalStatus.DA_DUYET) {
                        throw new IllegalArgumentException("Auction is not approved");
                }

                Product product = session.getTaiSan();
                if (product == null) {
                        throw new IllegalArgumentException("Product not found in this auction");
                }

                // Verify it's the correct product
                if (!product.getId().equals(productId)) {
                        throw new IllegalArgumentException("Product does not belong to this auction");
                }

                // Return product response
                return productResponseMapper.toProductResponse(product);
        }
}
