package io.github.guennhatking.libra_auction.services;

import io.github.guennhatking.libra_auction.enums.auction.TrangThaiKiemDuyet;
import io.github.guennhatking.libra_auction.enums.auction.TrangThaiPhien;
import io.github.guennhatking.libra_auction.mappers.AuctionSessionMapper;
import io.github.guennhatking.libra_auction.models.auction.PhienDauGia;
import io.github.guennhatking.libra_auction.models.auction.ThongTinPhienDauGia;
import io.github.guennhatking.libra_auction.models.product.TaiSan;
import io.github.guennhatking.libra_auction.repositories.auction.PhienDauGiaRepository;
import io.github.guennhatking.libra_auction.repositories.product.TaiSanRepository;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionSessionCreateRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.AuctionSessionUpdateRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.AuctionSessionResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Comparator;
import java.util.List;

@Service
public class AuctionSessionService {
    private final PhienDauGiaRepository phienDauGiaRepository;
    private final AuctionSessionMapper auctionSessionMapper;
    private final TaiSanRepository taiSanRepository;

    public AuctionSessionService(PhienDauGiaRepository phienDauGiaRepository,
            AuctionSessionMapper auctionSessionMapper,
            TaiSanRepository taiSanRepository) {
        this.phienDauGiaRepository = phienDauGiaRepository;
        this.auctionSessionMapper = auctionSessionMapper;
        this.taiSanRepository = taiSanRepository;
    }

    @Transactional(readOnly = true)
    public List<AuctionSessionResponse> getAuctionSessions() {
        List<PhienDauGia> phienDauGiaList = phienDauGiaRepository.findAll().stream()
                .sorted(Comparator.comparing(PhienDauGia::getThoiGianTao,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
        return auctionSessionMapper.toAuctionSessionResponseList(phienDauGiaList);
    }

    @Transactional(readOnly = true)
    public AuctionSessionResponse getAuctionSessionById(String id) {
        PhienDauGia session = phienDauGiaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));
        return auctionSessionMapper.toAuctionSessionResponse(session);
    }

    @Transactional
    public AuctionSessionResponse createAuctionSession(AuctionSessionCreateRequest request) {
        TaiSan product = taiSanRepository.findById(request.taiSanId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (product.getThongTinPhienDauGia() != null) {
            throw new IllegalArgumentException("Product already has an auction session");
        }

        ThongTinPhienDauGia auctionInfo = new ThongTinPhienDauGia(
                0L,
                request.giaKhoiDiem(),
                request.buocGiaNhoNhat(),
                product.getTenTaiSan(),
                product);

        PhienDauGia session = new PhienDauGia(
                null,
                auctionInfo,
                request.thoiGianBatDau(),
                request.giaKhoiDiem(),
                request.buocGiaNhoNhat());
        session.setTaiSan(product);
        session.setThoiLuong(request.thoiLuong());
        session.setLoaiDauGia(request.loaiDauGia());
        session.setTrangThaiKiemDuyet(TrangThaiKiemDuyet.CHUA_DUYET);
        session.setTrangThaiPhien(TrangThaiPhien.CHUA_BAT_DAU);

        PhienDauGia savedSession = phienDauGiaRepository.save(session);
        product.setThongTinPhienDauGia(savedSession.getThongTinPhienDauGia());

        return auctionSessionMapper.toAuctionSessionResponse(savedSession);
    }

    @Transactional
    public AuctionSessionResponse updateAuctionSession(String id, AuctionSessionUpdateRequest request) {
        PhienDauGia session = phienDauGiaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));

        session.setThoiGianBatDau(request.thoiGianBatDau());
        session.setThoiLuong(request.thoiLuong());
        session.setGiaKhoiDiem(request.giaKhoiDiem());
        session.setBuocGiaNhoNhat(request.buocGiaNhoNhat());
        session.setLoaiDauGia(request.loaiDauGia());

        PhienDauGia updatedSession = phienDauGiaRepository.save(session);
        return auctionSessionMapper.toAuctionSessionResponse(updatedSession);
    }

    @Transactional
    public void deleteAuctionSession(String id) {
        PhienDauGia session = phienDauGiaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Auction session not found"));
        phienDauGiaRepository.delete(session);
    }

}
