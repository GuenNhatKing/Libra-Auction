package io.github.guennhatking.libra_auction.services.qa;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.guennhatking.libra_auction.enums.qa.QuestionStatus;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.person.Customer;
import io.github.guennhatking.libra_auction.models.qa.Question;
import io.github.guennhatking.libra_auction.repositories.auction.AuctionRepository;
import io.github.guennhatking.libra_auction.repositories.person.CustomerRepository;
import io.github.guennhatking.libra_auction.repositories.qa.QuestionRepository;
import io.github.guennhatking.libra_auction.services.EmailNotificationService;

@Service
public class QuestionService {

    private static final Logger logger = LoggerFactory.getLogger(QuestionService.class);

    private final QuestionRepository questionRepository;
    private final AuctionRepository auctionRepository;
    private final CustomerRepository customerRepository;
    private final EmailNotificationService emailNotificationService;

    public QuestionService(QuestionRepository questionRepository,
                           AuctionRepository auctionRepository,
                           CustomerRepository customerRepository,
                           EmailNotificationService emailNotificationService) {
        this.questionRepository = questionRepository;
        this.auctionRepository = auctionRepository;
        this.customerRepository = customerRepository;
        this.emailNotificationService = emailNotificationService;
    }

    @Transactional
    public Question askQuestion(String auctionId, String userId, String content) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found: " + auctionId));
        Customer questioner = customerRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        Question question = new Question(auction, questioner, content);
        question.setQuestionStatus(QuestionStatus.UNANSWERED);
        return questionRepository.save(question);
    }

    @Transactional
    public Question answerQuestion(String questionId, String sellerId, String answerContent) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found: " + questionId));

        verifySellerOwnership(question.getAuction(), sellerId);

        Customer seller = customerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found: " + sellerId));

        question.setAnswerContent(answerContent);
        question.setAnswerer(seller);
        question.setAnswerTime(OffsetDateTime.now(ZoneOffset.ofHours(7)));
        question.setQuestionStatus(QuestionStatus.ANSWERED);
        return questionRepository.save(question);
    }

    @Transactional
    public Question rejectQuestion(String questionId, String sellerId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found: " + questionId));

        verifySellerOwnership(question.getAuction(), sellerId);

        question.setQuestionStatus(QuestionStatus.ANSWER_REJECTED);
        Question saved = questionRepository.save(question);

        // Send email notification to the questioner
        try {
            if (question.getQuestioner() != null && question.getQuestioner().getEmail() != null) {
                String auctionName = question.getAuction().getProduct() != null
                        ? question.getAuction().getProduct().getName()
                        : "N/A";
                emailNotificationService.sendQuestionRejectedEmail(
                        question.getQuestioner().getEmail(),
                        question.getQuestionContent(),
                        auctionName);
            }
        } catch (Exception e) {
            logger.error("Failed to send question rejected email: {}", e.getMessage(), e);
        }

        return saved;
    }

    @Transactional(readOnly = true)
    public List<Question> getPublicQuestionsByAuction(String auctionId) {
        return questionRepository.findByAuctionIdAndQuestionStatusOrderByQuestionTimeAsc(
                auctionId, QuestionStatus.ANSWERED);
    }

    @Transactional(readOnly = true)
    public List<Question> getPublicQuestionsWithOwnByAuction(String auctionId, String userId) {
        // Get all answered questions
        List<Question> answered = questionRepository.findByAuctionIdAndQuestionStatusOrderByQuestionTimeAsc(
                auctionId, QuestionStatus.ANSWERED);
        // Get user's own questions (any status)
        List<Question> ownQuestions = questionRepository.findByAuctionIdAndQuestionerIdOrderByQuestionTimeAsc(
                auctionId, userId);
        // Merge: answered + own (avoid duplicates)
        java.util.Set<String> answeredIds = answered.stream()
                .map(Question::getId)
                .collect(java.util.stream.Collectors.toSet());
        List<Question> result = new java.util.ArrayList<>(answered);
        for (Question q : ownQuestions) {
            if (!answeredIds.contains(q.getId())) {
                result.add(q);
            }
        }
        // Sort by questionTime ascending
        result.sort(java.util.Comparator.comparing(Question::getQuestionTime));
        return result;
    }

    @Transactional(readOnly = true)
    public List<Question> getAllQuestionsByAuction(String auctionId) {
        return questionRepository.findByAuctionIdOrderByQuestionTimeAsc(auctionId);
    }

    private void verifySellerOwnership(Auction auction, String sellerId) {
        if (auction.getCreator() == null || !auction.getCreator().getId().equals(sellerId)) {
            throw new RuntimeException("You are not the owner of this auction");
        }
    }
}
