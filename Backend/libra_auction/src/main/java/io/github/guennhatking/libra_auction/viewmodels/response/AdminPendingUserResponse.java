package io.github.guennhatking.libra_auction.viewmodels.response;

import io.github.guennhatking.libra_auction.enums.account.AccountStatus;
import io.github.guennhatking.libra_auction.enums.account.EmailStatus;

public record AdminPendingUserResponse(
        String id,
        String hoVaTen,
        String soDienThoai,
        String CCCD,
        String email,
        String anhDaiDien,
        EmailStatus trangThaiEmail,
        AccountStatus trangThaiTaiKhoan) {
}