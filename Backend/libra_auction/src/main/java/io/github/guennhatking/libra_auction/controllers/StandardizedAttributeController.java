package io.github.guennhatking.libra_auction.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.guennhatking.libra_auction.models.product.StandardizedAttribute;
import io.github.guennhatking.libra_auction.services.StandardizedAttributeService;
import io.github.guennhatking.libra_auction.viewmodels.response.ServerAPIResponse;

@RestController
@RequestMapping("/api/public/standardized-attributes")
public class StandardizedAttributeController {

    private final StandardizedAttributeService standardizedAttributeService;

    public StandardizedAttributeController(StandardizedAttributeService standardizedAttributeService) {
        this.standardizedAttributeService = standardizedAttributeService;
    }

    @GetMapping
    public ResponseEntity<ServerAPIResponse<List<String>>> getAttributeNames() {
        List<String> names = standardizedAttributeService.getAttributeNames();
        return ResponseEntity.ok(ServerAPIResponse.success(names));
    }

    @GetMapping("/{name}/values")
    public ResponseEntity<ServerAPIResponse<List<StandardizedAttribute>>> getValuesByName(
            @PathVariable String name) {
        List<StandardizedAttribute> values = standardizedAttributeService.getValuesByName(name);
        return ResponseEntity.ok(ServerAPIResponse.success(values));
    }

    @GetMapping("/search")
    public ResponseEntity<ServerAPIResponse<List<StandardizedAttribute>>> search(
            @RequestParam String keyword) {
        List<StandardizedAttribute> results = standardizedAttributeService.search(keyword);
        return ResponseEntity.ok(ServerAPIResponse.success(results));
    }
}
