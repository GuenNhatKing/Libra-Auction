package io.github.guennhatking.libra_auction.models.transaction;

import io.github.guennhatking.libra_auction.enums.transaction.TransactionType;
import io.github.guennhatking.libra_auction.models.auction.AuctionResult;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class PaymentTransaction extends Transaction {
    @ManyToOne
    private Customer nguoiGui;

    @ManyToOne
    private Customer nguoiNhan;

    @OneToOne
    private AuctionResult ketQuaDauGia; 

    // CONSTRUCTOR
    protected PaymentTransaction() {
    }

    public PaymentTransaction(long soTien, Customer nguoiGui, Customer nguoiNhan, AuctionResult ketQuaDauGia) {
        super(TransactionType.THANH_TOAN, soTien);
        this.nguoiGui = nguoiGui;
        this.nguoiNhan = nguoiNhan;
        this.ketQuaDauGia = ketQuaDauGia;
    }

    // GETTER
    public Customer getNguoiGui() {
        return nguoiGui;
    }

    public Customer getNguoiNhan() {
        return nguoiNhan;
    }

    public AuctionResult getKetQuaDauGia() {
        return ketQuaDauGia;
    }

    // SETTER
    public void setNguoiGui(Customer nguoiGui) {
        this.nguoiGui = nguoiGui;
    }

    public void setNguoiNhan(Customer nguoiNhan) {
        this.nguoiNhan = nguoiNhan;
    }

    public void setKetQuaDauGia(AuctionResult ketQuaDauGia) {
        this.ketQuaDauGia = ketQuaDauGia;
    }
}