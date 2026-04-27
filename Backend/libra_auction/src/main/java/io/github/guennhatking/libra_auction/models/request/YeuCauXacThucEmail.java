package io.github.guennhatking.libra_auction.models.request;

import io.github.guennhatking.libra_auction.enums.request.LoaiYeuCau;
import io.github.guennhatking.libra_auction.models.person.NguoiDung;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class YeuCauXacThucEmail extends YeuCau {
    @OneToOne
    private YeuCauOTP yeuCauOTP;

    // CONSTRUCTOR
    protected YeuCauXacThucEmail() {
    }

    public YeuCauXacThucEmail(NguoiDung nguoiYeuCau) {
        super(nguoiYeuCau, LoaiYeuCau.XAC_THUC_EMAIL);
    }

    // GETTER
    public YeuCauOTP getYeuCauOTP() {
        return yeuCauOTP;
    }

    // SETTER
    public void setYeuCauOTP(YeuCauOTP yeuCauOTP) {
        this.yeuCauOTP = yeuCauOTP;
    }
}
