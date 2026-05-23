package io.github.guennhatking.libra_auction.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.guennhatking.libra_auction.mappers.AuctionRegistrationMapper;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.auction.AuctionParticipationInfo;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.repositories.auction.AuctionRepository;
import io.github.guennhatking.libra_auction.repositories.auction.AuctionParticipationInfoRepository;
import io.github.guennhatking.libra_auction.repositories.person.CustomerRepository;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionRegistrationCreateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.AuctionRegistrationResponse;

@Service
public class AuctionRegistrationService {
        private final AuctionParticipationInfoRepository thongTinThamGiaDauGiaRepository;
        private final CustomerRepository nguoiDungRepository;
        private final AuctionRepository phienDauGiaRepository;
        private final AuctionRegistrationMapper auctionRegistrationMapper;

        public AuctionRegistrationService(AuctionParticipationInfoRepository thongTinThamGiaDauGiaRepository,
                        CustomerRepository nguoiDungRepository,
                        AuctionRepository phienDauGiaRepository,
                        AuctionRegistrationMapper auctionRegistrationMapper) {
                this.thongTinThamGiaDauGiaRepository = thongTinThamGiaDauGiaRepository;
                this.nguoiDungRepository = nguoiDungRepository;
                this.phienDauGiaRepository = phienDauGiaRepository;
                this.auctionRegistrationMapper = auctionRegistrationMapper;
        }

        @Transactional(readOnly = true)
        public List<AuctionRegistrationResponse> getAllRegistrations() {
                List<AuctionParticipationInfo> entities = thongTinThamGiaDauGiaRepository.findAll();
                List<AuctionRegistrationResponse> responses = auctionRegistrationMapper.toResponseList(entities);
                return responses;
        }

        @Transactional(readOnly = true)
        public AuctionRegistrationResponse getRegistrationById(String id) {
                // 1. Tìm entity từ Database
                AuctionParticipationInfo registration = thongTinThamGiaDauGiaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Registration not found"));

                // 2. Sử dụng mapper để chuyển đổi và trả về
                return auctionRegistrationMapper.toResponse(registration);
        }

        @Transactional
        public AuctionRegistrationResponse registerForAuction(AuctionRegistrationCreateRequest request, String userId) {
                // 1. Kiểm tra User
                Customer user = nguoiDungRepository.findById(userId)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

                // 2. Kiểm tra Phiên đấu giá
                Auction auction = phienDauGiaRepository.findById(request.auctionId())
                                .orElseThrow(() -> new IllegalArgumentException("Auction not found"));

                // 3. Kiểm tra đăng ký trùng lặp (Logic cũ giữ nguyên)
                boolean alreadyRegistered = Optional.ofNullable(auction.getDanhSachThamGia())
                                .orElse(Collections.emptyList())
                                .stream()
                                .anyMatch(reg -> reg.getNguoiThamGia().getId().equals(userId));

                if (alreadyRegistered) {
                        throw new IllegalArgumentException("User is already registered for this auction");
                }

                // 4. Tạo và lưu đăng ký
                AuctionParticipationInfo registration = new AuctionParticipationInfo(user, auction);
                AuctionParticipationInfo savedRegistration = thongTinThamGiaDauGiaRepository.save(registration);

                return auctionRegistrationMapper.toResponse(savedRegistration);
        }

        @Transactional
        public void deleteRegistration(String id) {
                AuctionParticipationInfo registration = thongTinThamGiaDauGiaRepository.findById(id)
                                .orElseThrow(() -> new IllegalArgumentException("Registration not found"));
                thongTinThamGiaDauGiaRepository.delete(registration);
        }

        @Transactional(readOnly = true)
        public List<AuctionRegistrationResponse> getRegistrationsByUserId(String userId) {
                // 1. Kiểm tra User tồn tại
                if (!nguoiDungRepository.existsById(userId)) {
                        throw new IllegalArgumentException("User not found");
                }

                // 2. Lấy dữ liệu đã lọc từ DB (Thay vì lấy tất cả rồi filter)
                List<AuctionParticipationInfo> entities = thongTinThamGiaDauGiaRepository.findByNguoiThamGiaId(userId);

                // 3. Sử dụng mapper để chuyển đổi toàn bộ danh sách
                return auctionRegistrationMapper.toResponseList(entities);
        }

        @Transactional(readOnly = true)
        public List<AuctionRegistrationResponse> getRegistrationsByAuctionId(String auctionId) {
                // 1. Kiểm tra phiên đấu giá có tồn tại không
                if (!phienDauGiaRepository.existsById(auctionId)) {
                        throw new IllegalArgumentException("Auction not found");
                }

                // 2. Lấy dữ liệu từ DB thông qua phương thức mới ở Repository
                List<AuctionParticipationInfo> entities = thongTinThamGiaDauGiaRepository
                                .findByPhienDauGiaId(auctionId);

                // 3. Sử dụng Mapper để chuyển đổi sang danh sách Response
                return auctionRegistrationMapper.toResponseList(entities);
        }
}
