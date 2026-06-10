package io.github.guennhatking.libra_auction.models.qa;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import io.github.guennhatking.libra_auction.enums.qa.QuestionStatus;
import io.github.guennhatking.libra_auction.models.auction.Auction;
import io.github.guennhatking.libra_auction.models.person.Customer;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    private Auction auction;

    @ManyToOne
    private Customer questioner;

    @ManyToOne
    private Customer answerer;

    private String questionContent;
    private String answerContent;
    private OffsetDateTime questionTime;
    private OffsetDateTime answerTime;

    @Enumerated(EnumType.STRING)
    private QuestionStatus questionStatus;

    // CONSTRUCTOR
    public Question() {
    }

    public Question(Auction auction, Customer questioner, String questionContent) {
        this.auction = auction;
        this.questioner = questioner;
        this.questionContent = questionContent;
        this.questionTime = OffsetDateTime.now(ZoneOffset.ofHours(7));
    }

    // GETTER
    public String getId() {
        return id;
    }

    public Auction getAuction() {
        return auction;
    }

    public Customer getQuestioner() {
        return questioner;
    }

    public Customer getAnswerer() {
        return answerer;
    }

    public String getQuestionContent() {
        return questionContent;
    }

    public String getAnswerContent() {
        return answerContent;
    }

    public OffsetDateTime getQuestionTime() {
        return questionTime;
    }

    public OffsetDateTime getAnswerTime() {
        return answerTime;
    }

    public QuestionStatus getQuestionStatus() {
        return questionStatus;
    }

    // SETTER
    public void setId(String id) {
        this.id = id;
    }

    public void setAuction(Auction auction) {
        this.auction = auction;
    }

    public void setQuestioner(Customer questioner) {
        this.questioner = questioner;
    }

    public void setAnswerer(Customer answerer) {
        this.answerer = answerer;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }

    public void setAnswerContent(String answerContent) {
        this.answerContent = answerContent;
    }

    public void setQuestionTime(OffsetDateTime questionTime) {
        this.questionTime = questionTime;
    }

    public void setAnswerTime(OffsetDateTime answerTime) {
        this.answerTime = answerTime;
    }

    public void setQuestionStatus(QuestionStatus questionStatus) {
        this.questionStatus = questionStatus;
    }

    // ===== Business Logic Methods =====

    /**
     * Answer this question.
     */
    public void answer(Customer answerer, String answerContent) {
        this.answerer = answerer;
        this.answerContent = answerContent;
        this.answerTime = OffsetDateTime.now(ZoneOffset.ofHours(7));
        this.questionStatus = QuestionStatus.ANSWERED;
    }

    /**
     * Reject this question (decline to answer).
     */
    public void reject() {
        this.questionStatus = QuestionStatus.ANSWER_REJECTED;
    }
}
