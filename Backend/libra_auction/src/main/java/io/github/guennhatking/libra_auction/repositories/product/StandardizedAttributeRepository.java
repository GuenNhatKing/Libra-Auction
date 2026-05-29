package io.github.guennhatking.libra_auction.repositories.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import io.github.guennhatking.libra_auction.models.product.StandardizedAttribute;

public interface StandardizedAttributeRepository extends JpaRepository<StandardizedAttribute, String> {

    @Query("SELECT DISTINCT sa.attributeName FROM StandardizedAttribute sa ORDER BY sa.attributeName")
    List<String> findDistinctAttributeNames();

    @Query("SELECT sa FROM StandardizedAttribute sa WHERE sa.attributeName = :name")
    List<StandardizedAttribute> findByAttributeName(@Param("name") String name);

    @Query("SELECT sa FROM StandardizedAttribute sa WHERE "
            + "LOWER(sa.attributeName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(sa.attributeValue) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<StandardizedAttribute> search(@Param("keyword") String keyword);
}
