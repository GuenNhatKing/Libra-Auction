package io.github.guennhatking.libra_auction.services;

import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.request.OtpRequest;
import io.github.guennhatking.libra_auction.repositories.request.OtpRequestRepository;
import io.github.guennhatking.libra_auction.enums.request.RequestStatus;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.OffsetDateTime;

@Service
public class OtpService {

    private static final int OTP_LENGTH = 6;
    private static final long OTP_TTL_MINUTES = 5;

    private final OtpRequestRepository otpRequestRepository;
    private final CustomerService customerService;

    public OtpService(OtpRequestRepository otpRequestRepository, CustomerService customerService) {
        this.otpRequestRepository = otpRequestRepository;
        this.customerService = customerService;
    }

    public String generateAndStore(String email) {
        Customer customer = customerService.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Khong tim thay tai khoan voi email nay."));

        String otp = generateOtp();

        OtpRequest otpRequest = new OtpRequest(customer);
        otpRequest.setGeneratedOtpCode(otp);
        otpRequest.setRequestStatus(RequestStatus.PROCESSING);
        otpRequest.setActivationExpiry(OffsetDateTime.now().plusMinutes(OTP_TTL_MINUTES));

        otpRequestRepository.save(otpRequest);
        return otp;
    }

    public boolean verify(String email, String otp) {
        OtpRequest otpRequest = otpRequestRepository.findLatestByEmail(email)
                .orElse(null);

        if (otpRequest == null) {
            return false;
        }

        // Check if OTP has expired
        if (OffsetDateTime.now().isAfter(otpRequest.getActivationExpiry())) {
            return false;
        }

        // Check if OTP matches
        if (!otpRequest.getGeneratedOtpCode().equals(otp)) {
            return false;
        }

        // Mark as used
        otpRequest.setRequestStatus(RequestStatus.COMPLETED);
        otpRequest.setUserInputOtpCode(otp);
        otpRequestRepository.save(otpRequest);

        return true;
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int number = random.nextInt((int) Math.pow(10, OTP_LENGTH));
        return String.format("%0" + OTP_LENGTH + "d", number);
    }
}
