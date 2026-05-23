package io.github.guennhatking.libra_auction.repositories.qa;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.guennhatking.libra_auction.models.qa.Question;

public interface QuestionRepository extends JpaRepository<Question, String> {
}
