package io.github.guennhatking.libra_auction.services;

import io.github.guennhatking.libra_auction.enums.account.EmailStatus;
import io.github.guennhatking.libra_auction.enums.account.AccountStatus;
import io.github.guennhatking.libra_auction.models.account.Role;
import io.github.guennhatking.libra_auction.models.account.TaiKhoanOAuth;
import io.github.guennhatking.libra_auction.models.account.TaiKhoanPassword;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.repositories.account.RoleRepository;
import io.github.guennhatking.libra_auction.repositories.account.TaiKhoanOAuthRepository;
import io.github.guennhatking.libra_auction.repositories.account.TaiKhoanPasswordRepository;
import io.github.guennhatking.libra_auction.repositories.person.CustomerRepository;
import io.github.guennhatking.libra_auction.viewmodels.response.ImageUploadedResponse;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomerService {
    private final CustomerRepository nguoiDungRepository;
    private final TaiKhoanPasswordRepository taiKhoanPasswordRepository;
    private final TaiKhoanOAuthRepository taiKhoanOAuthRepository;
    private final RoleRepository roleRepository;
    private final PasswordService passwordService;
    private final ImageUploadService imageUploadService;    

    public CustomerService(CustomerRepository nguoiDungRepository,
            TaiKhoanPasswordRepository taiKhoanPasswordRepository,
            TaiKhoanOAuthRepository taiKhoanOAuthRepository,
            RoleRepository roleRepository,
            PasswordService passwordService,
            ImageUploadService imageUploadService) {
        this.nguoiDungRepository = nguoiDungRepository;
        this.taiKhoanPasswordRepository = taiKhoanPasswordRepository;
        this.taiKhoanOAuthRepository = taiKhoanOAuthRepository;
        this.roleRepository = roleRepository;
        this.passwordService = passwordService;
        this.imageUploadService = imageUploadService;
    }

    @Transactional
    public Customer createPasswordUser(String email, String username, String password, String hoVaTen) {
        return createPasswordUser(email, username, password, hoVaTen, null, null, null);
    }

    @Transactional
    public Customer createPasswordUser(String email, String username, String password, String hoVaTen,
            String soDienThoai, String cccd, String anhDaiDien) {
        if (taiKhoanPasswordRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("The username already exists");
        }

        Customer user = new Customer(hoVaTen, email);
        user.setSoDienThoai(soDienThoai);
        user.setCccd(cccd);
        user.setAnhDaiDien(anhDaiDien);
        user.setTrangThaiEmail(EmailStatus.CHUA_XAC_THUC);
        user.setTrangThaiTaiKhoan(AccountStatus.CHO_XAC_NHAN);

        Customer savedUser = nguoiDungRepository.save(user);

        String encodedPassword = passwordService.encodePassword(password);
        TaiKhoanPassword taiKhoan = new TaiKhoanPassword(
                UUID.randomUUID().toString(),
                username,
                encodedPassword,
                new byte[0]);
        taiKhoan.setNguoiDung(savedUser);
        taiKhoan.setTrangThai(AccountStatus.CHO_XAC_NHAN);
        taiKhoanPasswordRepository.save(taiKhoan);

        assignDefaultRole(savedUser);

        return savedUser;
    }

    public Customer createOAuthUser(String email, String googleId, String displayName, String pictureUrl) {
        Optional<Customer> existingUser = nguoiDungRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        Customer user = new Customer(displayName, email);
        try {
            ImageUploadedResponse newUrl = imageUploadService.uploadImageFromUrl(pictureUrl, "avatars");
            user.setAnhDaiDien(newUrl.secureUrl());
        } catch (Exception e) {
            System.out.println("Failed to upload avatar for user " + email + ": " + e.getMessage());
        }
        user.setTrangThaiEmail(EmailStatus.DA_XAC_THUC);
        user.setTrangThaiTaiKhoan(AccountStatus.HOAT_DONG);

        Customer savedUser = nguoiDungRepository.save(user);

        TaiKhoanOAuth oauthAccount = new TaiKhoanOAuth(
                UUID.randomUUID().toString(),
                "google",
                googleId);
        oauthAccount.setNguoiDung(savedUser);
        oauthAccount.setTrangThai(AccountStatus.HOAT_DONG);
        taiKhoanOAuthRepository.save(oauthAccount);

        assignDefaultRole(savedUser);

        return savedUser;
    }

    public Optional<Customer> findByEmail(String email) {
        return nguoiDungRepository.findByEmail(email);
    }

    public Optional<Customer> findById(String userId) {
        return nguoiDungRepository.findById(userId);
    }

    public Optional<TaiKhoanPassword> findPasswordAccountByUsername(String username) {
        return taiKhoanPasswordRepository.findByUsername(username);
    }

    public Optional<TaiKhoanOAuth> findOAuthAccountByProviderId(String providerId) {
        return taiKhoanOAuthRepository.findByProviderId(providerId);
    }

    private void assignDefaultRole(Customer user) {
        Optional<Role> defaultRole = roleRepository.findById("USER");
        if (defaultRole.isPresent()) {
            user.setRoles(new ArrayList<>(List.of(defaultRole.get())));
            nguoiDungRepository.save(user);
        }
    }
}
