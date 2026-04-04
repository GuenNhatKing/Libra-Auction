package io.github.guennhatking.libra_auction.util;

import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

@Component
public class RSAKeyProvider {
    
    @Value("${jwt.private-key}")
    private String privateKeyPath;
    
    @Value("${jwt.public-key}")
    private String publicKeyPath;
    
    private RSAPrivateKey privateKey;
    private RSAPublicKey publicKey;
    
    public RSAPrivateKey getPrivateKey() throws JOSEException {
        if (privateKey == null) {
            try {
                String keyString = extractKeyContent(privateKeyPath);
                byte[] decodedKey = Base64.getDecoder().decode(keyString);
                
                PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decodedKey);
                KeyFactory kf = KeyFactory.getInstance("RSA");
                privateKey = (RSAPrivateKey) kf.generatePrivate(spec);
            } catch (Exception e) {
                throw new JOSEException("Failed to load private key", e);
            }
        }
        return privateKey;
    }
    
    public RSAPublicKey getPublicKey() throws JOSEException {
        if (publicKey == null) {
            try {
                String keyString = extractKeyContent(publicKeyPath);
                byte[] decodedKey = Base64.getDecoder().decode(keyString);
                
                X509EncodedKeySpec spec = new X509EncodedKeySpec(decodedKey);
                KeyFactory kf = KeyFactory.getInstance("RSA");
                publicKey = (RSAPublicKey) kf.generatePublic(spec);
            } catch (Exception e) {
                throw new JOSEException("Failed to load public key", e);
            }
        }
        return publicKey;
    }
    
    /**
     * Extract key content from either a file path or direct key content.
     * Handles:
     * 1. File paths (relative or absolute)
     * 2. Base64 key content with PEM headers (contains -----BEGIN)
     * 3. Base64 key content without headers (plain Base64 string)
     */
    private String extractKeyContent(String keyPathOrContent) throws IOException {
        // If it contains PEM headers, extract the Base64 content
        if (keyPathOrContent.contains("-----BEGIN")) {
            return keyPathOrContent
                    .replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replace("\n", "")
                    .replace("\r", "")
                    .replace(" ", "");
        }
        
        // Check if it looks like a Base64 string (no slashes, typical Base64 characters)
        // Base64 strings contain A-Z, a-z, 0-9, +, /, =
        if (keyPathOrContent.matches("[A-Za-z0-9+/=]+")) {
            // It's a Base64 string - use it directly
            return keyPathOrContent;
        }
        
        // Otherwise, treat it as a file path
        return new String(Files.readAllBytes(Paths.get(keyPathOrContent)), StandardCharsets.UTF_8);
    }
}
