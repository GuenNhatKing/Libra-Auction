package io.github.guennhatking.libra_auction.config;

import io.github.guennhatking.libra_auction.services.AuctionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Startup configuration to register existing approved auctions to Redis scheduler
 * This ensures that auctions that were approved before the Redis integration
 * will be automatically scheduled when the application starts.
 */
@Configuration
public class AuctionSchedulerStartup {
    
    private static final Logger logger = LoggerFactory.getLogger(AuctionSchedulerStartup.class);
    
    @Bean
    public ApplicationRunner registerAuctionsOnStartup(AuctionService auctionService) {
        return args -> {
            try {
                logger.info("Registering existing approved auctions to scheduler...");
                int count = auctionService.registerExistingAuctionsToRedis();
                logger.info("Successfully registered {} auctions to the scheduler", count);
            } catch (Exception e) {
                logger.error("Error registering auctions on startup: {}", e.getMessage(), e);
            }
        };
    }
}
