package io.github.guennhatking.libra_auction.controllers;

import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.repositories.person.CustomerRepository;
import io.github.guennhatking.libra_auction.security.JwtUserDetails;
import io.github.guennhatking.libra_auction.services.VNPayService;
import io.github.guennhatking.libra_auction.viewmodels.request.VNPayDepositRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.VNPayPaymentRequest;
import io.github.guennhatking.libra_auction.viewmodels.request.VerifyPaymentRequest;
import io.github.guennhatking.libra_auction.viewmodels.response.PendingWinnerPaymentResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.ServerAPIResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.UserTransactionResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.VNPayPaymentResponse;
import io.github.guennhatking.libra_auction.viewmodels.response.VNPayTransactionResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller for VNPay payment processing
 */
@RestController
@RequestMapping("/api/payments/vnpay")
public class VNPayController {
    private final VNPayService vnPayService;
    private final CustomerRepository customerRepository;

    public VNPayController(VNPayService vnPayService, CustomerRepository customerRepository) {
        this.vnPayService = vnPayService;
        this.customerRepository = customerRepository;
    }

    private boolean isAdminUser(String userId) {
        Optional<Customer> user = customerRepository.findById(userId);
        if (user.isEmpty()) {
            return false;
        }
        return user.get().getRole() != null && "ADMIN".equalsIgnoreCase(user.get().getRole().getName());
    }

    @PostMapping("/create-deposit")
    public ResponseEntity<ServerAPIResponse<VNPayPaymentResponse>> createDeposit(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @Valid @RequestBody VNPayDepositRequest request,
            HttpServletRequest servletRequest) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        try {
            VNPayPaymentResponse response = vnPayService.createDeposit(request, userDetails.getUserId(),
                    servletRequest);
            return ResponseEntity.ok(ServerAPIResponse.success(response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/create-payment")
    public ResponseEntity<ServerAPIResponse<VNPayPaymentResponse>> createPayment(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @Valid @RequestBody VNPayPaymentRequest request,
            HttpServletRequest servletRequest) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        try {
            VNPayPaymentResponse response = vnPayService.createPayment(request, userDetails.getUserId(),
                    servletRequest);
            return ResponseEntity.ok(ServerAPIResponse.success(response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/deposit/successed")
    public ResponseEntity<ServerAPIResponse<Boolean>> depositSuccessed(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @Valid @RequestBody VerifyPaymentRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        try {
            boolean isVerified = vnPayService.depositSuccessed(request);
            return ResponseEntity.ok(ServerAPIResponse.success(isVerified));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/payment/successed")
    public ResponseEntity<ServerAPIResponse<Boolean>> paymentSuccessed(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @Valid @RequestBody VerifyPaymentRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        try {
            boolean isVerified = vnPayService.paymentSuccessed(request);
            return ResponseEntity.ok(ServerAPIResponse.success(isVerified));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<ServerAPIResponse<VNPayTransactionResponse>> getTransaction(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable String transactionId) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }

        try {
            VNPayTransactionResponse response = vnPayService.getTransactionStatus(transactionId);
            return ResponseEntity.ok(ServerAPIResponse.success(response));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ServerAPIResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/deposit/status/{auctionId}")
    public ResponseEntity<ServerAPIResponse<Boolean>> isDepositPaid(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable String auctionId) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }
        boolean paid = vnPayService.isDepositPaid(userDetails.getUserId(), auctionId);
        return ResponseEntity.ok(ServerAPIResponse.success(paid));
    }

    @GetMapping("/admin/transactions")
    public ResponseEntity<ServerAPIResponse<java.util.List<UserTransactionResponse>>> getAdminTransactions(
            @AuthenticationPrincipal JwtUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }
        if (!isAdminUser(userDetails.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ServerAPIResponse.error("Admin role required"));
        }

        return ResponseEntity.ok(ServerAPIResponse.success(vnPayService.getAllTransactions()));
    }

    @GetMapping("/user/{userId}/pending-payments")
    public ResponseEntity<ServerAPIResponse<java.util.List<PendingWinnerPaymentResponse>>> getPendingWinnerPayments(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable String userId) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }
        if (!userDetails.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ServerAPIResponse.error("Access denied"));
        }

        return ResponseEntity.ok(ServerAPIResponse.success(vnPayService.getPendingWinnerPayments(userId)));
    }

    @GetMapping("/seller/{sellerId}/transactions")
    public ResponseEntity<ServerAPIResponse<java.util.List<UserTransactionResponse>>> getSellerTransactions(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable String sellerId) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }
        if (!userDetails.getUserId().equals(sellerId) && !isAdminUser(userDetails.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ServerAPIResponse.error("Access denied"));
        }

        return ResponseEntity.ok(ServerAPIResponse.success(vnPayService.getSellerTransactions(sellerId)));
    }

    @GetMapping("/user/{userId}/transactions")
    public ResponseEntity<ServerAPIResponse<java.util.List<UserTransactionResponse>>> getUserTransactions(
            @AuthenticationPrincipal JwtUserDetails userDetails,
            @PathVariable String userId) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ServerAPIResponse.error("Authentication required"));
        }
        if (!userDetails.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(ServerAPIResponse.error("Access denied"));
        }

        return ResponseEntity.ok(ServerAPIResponse.success(vnPayService.getTransactionsByUserId(userId)));
    }
}
