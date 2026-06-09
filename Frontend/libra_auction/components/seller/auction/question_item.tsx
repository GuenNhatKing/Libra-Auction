"use client";

import { useState } from "react";
import { AuctionQuestion } from "@/types/auction/auction_question";
import { DateFormat } from "@/utils/date_format";
import { AnswerForm } from "./answer_form";

interface QuestionItemProps {
  question: AuctionQuestion;
  onAnswerSubmit?: (questionId: string, answerText: string) => Promise<void>;
  onReject?: (questionId: string) => Promise<void>;
}

export const QuestionItem = ({ question, onAnswerSubmit, onReject }: QuestionItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerSubmit = async (qId: string, answerText: string) => {
    setError(null);
    try {
      if (onAnswerSubmit) {
        await onAnswerSubmit(qId, answerText);
      }
      setShowReplyForm(false);
    } catch {
      setError("Failed to submit answer. Please try again.");
    }
  };

  const handleReject = async () => {
    if (isRejecting || !onReject) return;
    setError(null);
    setIsRejecting(true);
    try {
      await onReject(question.id);
    } catch {
      setError("Failed to reject question. Please try again.");
    } finally {
      setIsRejecting(false);
    }
  };

  const isUnanswered = question.question_status === "UNANSWERED";
  const isRejected = question.question_status === "ANSWER_REJECTED";

  return (
    <div className="space-y-3">
      {/* User question */}
      <div className="bg-[#F8FCFD] p-4 rounded-xl border border-[#AFD3E2]">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-3">
              {question.avatar_url ? (
                <img src={question.avatar_url} alt={question.user_name} className="h-9 w-9 rounded-full object-cover" />
              ) : (
                <div className="h-9 w-9 rounded-full bg-[#19A7CE] flex items-center justify-center text-white font-bold text-sm">
                  {question.user_name.charAt(0).toUpperCase()}
                </div>
              )}
            <div>
              <p className="text-sm font-bold text-[#146C94]">{question.user_name}</p>
              <p className="text-[11px] text-[#5A7184]">{DateFormat(question.created_at)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isRejected && (
              <span className="text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                Rejected
              </span>
            )}
            {isUnanswered && (
              <>
                <button
                  onClick={handleReject}
                  disabled={isRejecting}
                  className="rounded-xl border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isRejecting ? "Rejecting..." : "Reject"}
                </button>
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="rounded-xl bg-[#146C94] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#0d5a7a]"
                >
                  {showReplyForm ? "Cancel" : "Reply"}
                </button>
              </>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{question.content}</p>

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

        {/* Inline reply form */}
        {showReplyForm && isUnanswered && (
          <AnswerForm
            questionId={question.id}
            onSubmit={handleAnswerSubmit}
          />
        )}
      </div>

      {/* Existing answer, if any */}
      {question.answer && (
        <div className="ml-8 border-l-2 border-[#19A7CE] pl-4 py-1">
          <div className="bg-white p-3 rounded-xl border border-[#AFD3E2]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold bg-[#146C94] text-white px-2 py-0.5 rounded-md">
                SELLER
              </span>
              <p className="text-[11px] text-[#5A7184]">{DateFormat(question.answer.replied_at)}</p>
            </div>
            <p className="text-sm text-gray-600 italic mt-1">
              {question.answer.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
