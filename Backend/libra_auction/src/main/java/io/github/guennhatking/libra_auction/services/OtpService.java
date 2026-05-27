package io.github.guennhatking.libra_auction.services;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;

@Service
public class OtpService {

    private static final int OTP_LENGTH = 6;
    private static final long OTP_TTL_MINUTES = 5;
    private static final String KEY_PREFIX = "otp:";

    private final StringRedisTemplate redisTemplate;

    public OtpService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String generateAndStore(String purpose, String email) {
        String otp = generateOtp();
        String key = buildKey(purpose, email);
        redisTemplate.opsForValue().set(key, otp, Duration.ofMinutes(OTP_TTL_MINUTES));
        return otp;
    }

    public boolean verify(String purpose, String email, String otp) {
        String key = buildKey(purpose, email);
        String stored = redisTemplate.opsForValue().get(key);
        if (stored == null || !stored.equals(otp)) {
            return false;
        }
        redisTemplate.delete(key);
        return true;
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int number = random.nextInt((int) Math.pow(10, OTP_LENGTH));
        return String.format("%0" + OTP_LENGTH + "d", number);
    }

    private String buildKey(String purpose, String email) {
        return KEY_PREFIX + purpose + ":" + email.toLowerCase();
    }
}
