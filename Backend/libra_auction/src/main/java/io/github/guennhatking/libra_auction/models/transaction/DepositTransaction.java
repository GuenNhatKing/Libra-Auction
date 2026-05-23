package io.github.guennhatking.libra_auction.models.transaction;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.time.OffsetDateTime;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionType;
import io.github.guennhatking.libra_auction.models.auction.AuctionParticipationInfo;
import io.github.guennhatking.libra_auction.models.person.Customer;

@Entity
public class DepositTransaction extends Transaction {
    @ManyToOne
    private Customer nguoiDatCoc;

    @ManyToOne
    private AuctionParticipationInfo thongTinThamGia;

    private OffsetDateTime thoiGianTraCoc;

    // CONSTRUCTOR
    protected DepositTransaction() {
    }

    public DepositTransaction(long soTien, Customer nguoiDatCoc, AuctionParticipationInfo thongTinThamGia) {
        super(TransactionType.DAT_COC, soTien);
        this.nguoiDatCoc = nguoiDatCoc;
        this.thongTinThamGia = thongTinThamGia;
        this.thoiGianTraCoc = null;
    }

    // GETTER
    public Customer getNguoiDatCoc() {
        return nguoiDatCoc;
    }

    public AuctionParticipationInfo getThongTinThamGia() {
        return thongTinThamGia;
    }

    public OffsetDateTime getThoiGianTraCoc() {
        return thoiGianTraCoc;
    }

    // SETTER
    public void setNguoiDatCoc(Customer nguoiDatCoc) {
        this.nguoiDatCoc = nguoiDatCoc;
    }

    public void setThongTinThamGia(AuctionParticipationInfo thongTinThamGia) {
        this.thongTinThamGia = thongTinThamGia;
    }

    public void setThoiGianTraCoc(OffsetDateTime thoiGianTraCoc) {
        this.thoiGianTraCoc = thoiGianTraCoc;
    }
}