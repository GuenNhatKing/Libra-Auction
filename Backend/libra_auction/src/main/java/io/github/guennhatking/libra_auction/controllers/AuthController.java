package io.github.guennhatking.libra_auction.controllers;

import io.github.guennhatking.libra_auction.models.request.EmailVerificationRequest;
import io.github.guennhatking.libra_auction.models.request.PasswordResetRequest;
import io.github.guennhatking.libra_auction.services.AuthenticationService;
import io.github.guennhatking.libra_auction.services.CustomerService;
import io.github.guennhatking.libra_auction.services.EmailNotificationService;
import io.github.guennhatking.libra_auction.services.OtpService;
import io.github.guennhatking.libra_auction.viewmodels.request.ActivateOtpRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ForgotPasswordRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.GoogleLoginRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.RefreshTokenRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.ResetPasswordRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.SendEmailVerificationRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.SigninRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.SignupRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.JwtResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.ServerAPIResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationService authenticationService;
    private final CustomerService customerService;
    private final OtpService otpService;
    private final EmailNotificationService emailNotificationService;

    public AuthController(AuthenticationService authenticationService,
                          CustomerService customerService,
                          OtpService otpService,
                          EmailNotificationService emailNotificationService) {
        this.authenticationService = authenticationService;
        this.customerService = customerService;
        this.otpService = otpService;
        this.emailNotificationService = emailNotificationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<ServerAPIResponse<JwtResponse>> signup(@Valid @RequestBody SignupRequest request) throws Exception {
        JwtResponse response = authenticationService.signup(request);
        return ResponseEntity.ok(ServerAPIResponse.success(response));
    }

    @PostMapping("/signin")
    public ResponseEntity<ServerAPIResponse<JwtResponse>> signin(@Valid @RequestBody SigninRequest request) throws Exception {
        JwtResponse response = authenticationService.signin(request);
        return ResponseEntity.ok(ServerAPIResponse.success(response));
    }

    @PostMapping("/google")
    public ResponseEntity<ServerAPIResponse<JwtResponse>> googleLogin(@Valid @RequestBody GoogleLoginRequest request) throws Exception {
        JwtResponse response = authenticationService.googleLogin(request);
        return ResponseEntity.ok(ServerAPIResponse.success(response));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ServerAPIResponse<JwtResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) throws Exception {
        JwtResponse response = authenticationService.refreshToken(request);
        return ResponseEntity.ok(ServerAPIResponse.success(response));
    }

    // ==================== Email Verification Flow ====================

    @PostMapping("/email/send-verification")
    public ResponseEntity<ServerAPIResponse<String>> sendEmailVerification(
            @Valid @RequestBody SendEmailVerificationRequest request) {
        OtpService.OtpGenerationResult result = otpService.generateForEmailVerification(request.email());
        emailNotificationService.sendEmailVerificationOtp(request.email(), result.otp());
        return ResponseEntity.ok(ServerAPIResponse.success(result.parentToken()));
    }

    @PostMapping("/otp/activate/{token}")
    public ResponseEntity<ServerAPIResponse<String>> activateOtp(
            @PathVariable String token,
            @Valid @RequestBody ActivateOtpRequest request) {
        otpService.activateOtpByParentToken(token, request.otp());
        return ResponseEntity.ok(ServerAPIResponse.success("OTP đã được kích hoạt."));
    }

    @PostMapping("/email/verify/{token}")
    public ResponseEntity<ServerAPIResponse<String>> verifyEmail(@PathVariable String token) {
        EmailVerificationRequest emailRequest = otpService.findEmailVerificationByToken(token);
        customerService.markEmailVerified(emailRequest.getCustomer().getEmail());
        otpService.markParentAsUsed(emailRequest);
        return ResponseEntity.ok(ServerAPIResponse.success("Xác thực email thành công."));
    }

    // ==================== Password Reset Flow ====================

    @PostMapping("/password/forgot")
    public ResponseEntity<ServerAPIResponse<String>> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {
        OtpService.OtpGenerationResult result = otpService.generateForPasswordReset(request.email());
        emailNotificationService.sendPasswordResetOtp(request.email(), result.otp());
        return ResponseEntity.ok(ServerAPIResponse.success(result.parentToken()));
    }

    @PostMapping("/password/reset/{token}")
    public ResponseEntity<ServerAPIResponse<String>> resetPassword(
            @PathVariable String token,
            @Valid @RequestBody ResetPasswordRequest request) {
        PasswordResetRequest passwordRequest = otpService.findPasswordResetByToken(token);
        customerService.resetPassword(passwordRequest.getCustomer().getEmail(), request.newPassword());
        otpService.markParentAsUsed(passwordRequest);
        return ResponseEntity.ok(ServerAPIResponse.success("Đặt lại mật khẩu thành công."));
    }
}
