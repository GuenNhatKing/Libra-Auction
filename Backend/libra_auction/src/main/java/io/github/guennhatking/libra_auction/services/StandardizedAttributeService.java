package io.github.guennhatking.libra_auction.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.guennhatking.libra_auction.models.product.StandardizedAttribute;
import io.github.guennhatking.libra_auction.repositories.product.StandardizedAttributeRepository;

@Service
public class StandardizedAttributeService {

    private final StandardizedAttributeRepository standardizedAttributeRepository;

    public StandardizedAttributeService(StandardizedAttributeRepository standardizedAttributeRepository) {
        this.standardizedAttributeRepository = standardizedAttributeRepository;
    }

    @Transactional(readOnly = true)
    public List<String> getAttributeNames() {
        return standardizedAttributeRepository.findDistinctAttributeNames();
    }

    @Transactional(readOnly = true)
    public List<StandardizedAttribute> getValuesByName(String name) {
        return standardizedAttributeRepository.findByAttributeName(name);
    }

    @Transactional(readOnly = true)
    public List<StandardizedAttribute> search(String keyword) {
        return standardizedAttributeRepository.search(keyword);
    }
}
