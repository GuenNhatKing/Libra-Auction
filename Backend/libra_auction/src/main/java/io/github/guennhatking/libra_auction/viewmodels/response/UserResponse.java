package io.github.guennhatking.libra_auction.viewmodels.response;

import java.util.Set;

import io.github.guennhatking.libra_auction.enums.account.TrangThaiEmail;
import io.github.guennhatking.libra_auction.enums.account.TrangThaiTaiKhoan;
import io.github.guennhatking.libra_auction.models.account.Role;

public record UserResponse(
    String id,
    String hoVaTen,
    String soDienThoai,
    String CCCD,
    String email,
    String anhDaiDien,
    TrangThaiEmail trangThaiEmail,
    TrangThaiTaiKhoan trangThaiTaiKhoan,
    Set<Role> roles
) {
}
