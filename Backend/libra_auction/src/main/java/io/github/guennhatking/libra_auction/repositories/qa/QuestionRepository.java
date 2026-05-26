package io.github.guennhatking.libra_auction.repositories.qa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.qa.Question;

public interface QuestionRepository extends JpaRepository<Question, String> {
	List<Question> findByPhienDauGiaIdOrderByThoiGianHoiAsc(String auctionId);
}
