package io.github.guennhatking.libra_auction.services;

import io.github.guennhatking.libra_auction.enums.account.EmailStatus;
import io.github.guennhatking.libra_auction.models.account.AccountPassword;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.request.EmailVerificationRequest;
import io.github.guennhatking.libra_auction.models.request.OtpRequest;
import io.github.guennhatking.libra_auction.models.request.PasswordResetRequest;
import io.github.guennhatking.libra_auction.models.request.RequestEntity;
import io.github.guennhatking.libra_auction.repositories.request.EmailVerificationRequestRepository;
import io.github.guennhatking.libra_auction.repositories.request.OtpRequestRepository;
import io.github.guennhatking.libra_auction.repositories.request.PasswordResetRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class OtpService {

    private static final int OTP_LENGTH = 6;
    private static final long OTP_TTL_MINUTES = 5;

    private final OtpRequestRepository otpRequestRepository;
    private final EmailVerificationRequestRepository emailVerificationRequestRepository;
    private final PasswordResetRequestRepository passwordResetRequestRepository;
    private final CustomerService customerService;

    public OtpService(
            OtpRequestRepository otpRequestRepository,
            EmailVerificationRequestRepository emailVerificationRequestRepository,
            PasswordResetRequestRepository passwordResetRequestRepository,
            CustomerService customerService) {
        this.otpRequestRepository = otpRequestRepository;
        this.emailVerificationRequestRepository = emailVerificationRequestRepository;
        this.passwordResetRequestRepository = passwordResetRequestRepository;
        this.customerService = customerService;
    }

    public record OtpGenerationResult(String otp, String parentToken) {}

    @Transactional
    public OtpGenerationResult generateForEmailVerification(String email) {
        Customer customer = customerService.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No account found with this email."));

        EmailVerificationRequest emailRequest = new EmailVerificationRequest(customer);
        emailRequest.setToken(UUID.randomUUID().toString());
        emailRequest.setActivationExpiry(OffsetDateTime.now().plusMinutes(OTP_TTL_MINUTES));
        emailRequest.setUsageExpiry(OffsetDateTime.now().plusMinutes(30));
        emailVerificationRequestRepository.save(emailRequest);

        String otp = generateOtp();
        OtpRequest otpRequest = createOtpRequest(customer, otp, emailRequest);
        otpRequestRepository.save(otpRequest);

        emailRequest.setOtpRequest(otpRequest);
        emailVerificationRequestRepository.save(emailRequest);

        return new OtpGenerationResult(otp, emailRequest.getToken());
    }

    @Transactional
    public OtpGenerationResult generateForPasswordReset(String email) {
        Customer customer = customerService.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("No account found with this email."));

        if (customer.getEmailStatus() != EmailStatus.VERIFIED) {
            throw new IllegalArgumentException("You need to verify your email before resetting your password.");
        }

        boolean hasPassword = customer.getLinkedAccounts() != null
                && customer.getLinkedAccounts().stream()
                        .anyMatch(a -> a instanceof AccountPassword);
        if (!hasPassword) {
            throw new IllegalArgumentException("This account does not have a password. Please sign in with your social account.");
        }

        PasswordResetRequest passwordRequest = new PasswordResetRequest(customer);
        passwordRequest.setToken(UUID.randomUUID().toString());
        passwordRequest.setActivationExpiry(OffsetDateTime.now().plusMinutes(OTP_TTL_MINUTES));
        passwordRequest.setUsageExpiry(OffsetDateTime.now().plusMinutes(30));
        passwordResetRequestRepository.save(passwordRequest);

        String otp = generateOtp();
        OtpRequest otpRequest = createOtpRequest(customer, otp, passwordRequest);
        otpRequestRepository.save(otpRequest);

        passwordRequest.setOtpRequest(otpRequest);
        passwordResetRequestRepository.save(passwordRequest);

        return new OtpGenerationResult(otp, passwordRequest.getToken());
    }

    @Transactional
    public void activateOtpByParentToken(String parentToken, String userInputOtp) {
        OtpRequest otpRequest = otpRequestRepository.findByRequestToActivateToken(parentToken)
                .orElseThrow(() -> new IllegalArgumentException("Token OTP khong hop le."));
        otpRequest.setUserInputOtpCode(userInputOtp);
        otpRequest.activate();
        otpRequest.use();
        otpRequestRepository.save(otpRequest);
        if (otpRequest.getRequestToActivate() != null) {
            saveRequestEntity(otpRequest.getRequestToActivate());
        }
    }

    public EmailVerificationRequest findEmailVerificationByToken(String token) {
        return emailVerificationRequestRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token xac thuc email khong hop le."));
    }

    public PasswordResetRequest findPasswordResetByToken(String token) {
        return passwordResetRequestRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token dat lai mat khau khong hop le."));
    }

    @Transactional
    public void markParentAsUsed(RequestEntity parent) {
        parent.use();
        saveRequestEntity(parent);
    }

    private OtpRequest createOtpRequest(Customer customer, String otp, RequestEntity parentRequest) {
        OtpRequest otpRequest = new OtpRequest(customer);
        otpRequest.setGeneratedOtpCode(otp);
        otpRequest.setToken(UUID.randomUUID().toString());
        otpRequest.setActivationExpiry(OffsetDateTime.now().plusMinutes(OTP_TTL_MINUTES));
        otpRequest.setUsageExpiry(OffsetDateTime.now().plusMinutes(10));
        otpRequest.setRequestToActivate(parentRequest);
        return otpRequest;
    }

    private void saveRequestEntity(RequestEntity entity) {
        if (entity instanceof EmailVerificationRequest evr) {
            emailVerificationRequestRepository.save(evr);
        } else if (entity instanceof PasswordResetRequest prr) {
            passwordResetRequestRepository.save(prr);
        }
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int number = random.nextInt((int) Math.pow(10, OTP_LENGTH));
        return String.format("%0" + OTP_LENGTH + "d", number);
    }
}
