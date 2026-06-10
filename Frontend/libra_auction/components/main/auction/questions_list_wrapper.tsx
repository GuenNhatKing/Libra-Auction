"use client";

import { useState } from "react";
import { AuctionQuestion } from "@/types/auction/auction_question";
import { DateFormat } from "@/utils/date_format";
import AskQuestionForm from "./ask_question_form";
import { fetchAuctionQuestionsWithOwn } from "@/services/fetch_auction_questions_with_own";
import { fetchPublicAuctionQuestions } from "@/services/fetch_public_auction_questions";

interface QuestionsListWrapperProps {
  auctionId: string;
  initialQuestions: AuctionQuestion[];
  isAuthenticated: boolean;
  currentUserId: string | null;
  isCreator: boolean;
  isAdmin: boolean;
}

export default function QuestionsListWrapper({ auctionId, initialQuestions, isAuthenticated, currentUserId, isCreator, isAdmin }: QuestionsListWrapperProps) {
  const [questions, setQuestions] = useState(initialQuestions);

  const refreshQuestions = async () => {
    try {
      const updated = isAuthenticated && currentUserId
        ? await fetchAuctionQuestionsWithOwn(auctionId)
        : await fetchPublicAuctionQuestions(auctionId);
      setQuestions(updated);
    } catch {
      // silently fail - user can refresh page
    }
  };

  // Filter questions: show all to owner, only answered to others
  const visibleQuestions = questions.filter((question) => {
    // If it's the user's own question, show it regardless of status
    if (currentUserId && question.user_id === currentUserId) {
      return true;
    }
    // Otherwise only show answered questions
    return question.question_status === "ANSWERED";
  });

  return (
    <>
      {isAuthenticated && !isCreator && !isAdmin && <AskQuestionForm auctionId={auctionId} onQuestionSubmitted={refreshQuestions} />}

      {visibleQuestions.length > 0 ? (
        <div className="space-y-5">
          {visibleQuestions.map((question) => (
            <div key={question.id} className="rounded-2xl border border-[#AFD3E2] bg-[#F8FCFD] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {question.avatar_url ? (
                    <img src={question.avatar_url} alt={question.user_name} className="h-9 w-9 rounded-full object-cover" />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-[#19A7CE] flex items-center justify-center text-white font-bold text-sm">
                      {question.user_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-[#146C94]">{question.user_name}</p>
                    <p className="text-[11px] text-[#5A7184] mt-0.5">{DateFormat(question.created_at)}</p>
                  </div>
                </div>
                {currentUserId && question.user_id === currentUserId && (
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    question.question_status === "ANSWER_REJECTED"
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : question.question_status === "ANSWERED"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-[#19A7CE]/10 text-[#19A7CE] border border-[#19A7CE]/20"
                  }`}>
                    {question.question_status === "ANSWER_REJECTED" ? "Rejected" : question.question_status === "ANSWERED" ? "Answered" : "Pending"}
                  </span>
                )}
                {!(currentUserId && question.user_id === currentUserId) && (
                  <span className="rounded-full bg-[#19A7CE]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#19A7CE]">
                    Question
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-700">{question.content}</p>

              {question.answer ? (
                <div className="mt-4 rounded-xl border border-[#AFD3E2] bg-white p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#146C94]">Answered</p>
                    <p className="text-[11px] text-[#5A7184]">{DateFormat(question.answer.replied_at)}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{question.answer.content}</p>
                </div>
              ) : currentUserId && question.user_id === currentUserId && question.question_status === "ANSWER_REJECTED" ? (
                <p className="mt-4 text-sm italic text-red-500">Your question has been rejected by the seller.</p>
              ) : currentUserId && question.user_id === currentUserId && question.question_status === "UNANSWERED" ? (
                <p className="mt-4 text-sm italic text-[#5A7184]">Waiting for seller response...</p>
              ) : (
                <p className="mt-4 text-sm italic text-[#5A7184]">No answer yet.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#AFD3E2] bg-[#F8FCFD] py-10 text-center">
          <p className="text-sm text-[#5A7184]">No questions have been posted for this auction yet.</p>
        </div>
      )}
    </>
  );
}
