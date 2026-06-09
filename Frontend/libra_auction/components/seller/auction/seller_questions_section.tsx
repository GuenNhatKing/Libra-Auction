"use client";

import { useEffect, useState, useCallback } from "react";
import { AuctionQuestion } from "@/types/auction/auction_question";
import { fetchSellerAuctionQuestions } from "@/services/fetch_seller_auction_questions";
import { answerAuctionQuestion } from "@/services/answer_auction_question";
import { rejectAuctionQuestion } from "@/services/reject_auction_question";
import { QuestionList } from "./question_list";

export default function SellerQuestionsSection({ auctionId }: { auctionId: string }) {
  const [questions, setQuestions] = useState<AuctionQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = useCallback(async () => {
    try {
      const data = await fetchSellerAuctionQuestions(auctionId);
      setQuestions(data);
      setError(null);
    } catch {
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  }, [auctionId]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleAnswerSubmit = async (questionId: string, answerText: string) => {
    await answerAuctionQuestion(questionId, answerText);
    await loadQuestions();
  };

  const handleReject = async (questionId: string) => {
    await rejectAuctionQuestion(questionId);
    await loadQuestions();
  };

  if (loading) {
    return (
      <div className="mt-8 p-6 bg-white rounded-2xl border border-[#AFD3E2]">
        <p className="text-sm text-[#5A7184] italic">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-white rounded-2xl border border-[#AFD3E2]">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl border border-[#AFD3E2]">
      <QuestionList
        questions={questions}
        onAnswerSubmit={handleAnswerSubmit}
        onReject={handleReject}
      />
    </div>
  );
}
