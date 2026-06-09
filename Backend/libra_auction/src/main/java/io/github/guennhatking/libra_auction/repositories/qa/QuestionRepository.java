package io.github.guennhatking.libra_auction.repositories.qa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.qa.Question;
import io.github.guennhatking.libra_auction.enums.qa.QuestionStatus;

public interface QuestionRepository extends JpaRepository<Question, String> {
	List<Question> findByAuctionIdOrderByQuestionTimeAsc(String auctionId);

	List<Question> findByAuctionIdAndQuestionStatusOrderByQuestionTimeAsc(String auctionId, QuestionStatus status);

	List<Question> findByAuctionIdAndQuestionerIdOrderByQuestionTimeAsc(String auctionId, String questionerId);
}
