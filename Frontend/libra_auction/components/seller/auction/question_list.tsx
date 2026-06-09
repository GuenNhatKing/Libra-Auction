"use client";
import { AuctionQuestion } from "@/types/auction/auction_question";
import { QuestionItem } from "./question_item";

interface QuestionListProps {
  questions: AuctionQuestion[];
  onAnswerSubmit?: (questionId: string, answerText: string) => Promise<void>;
  onReject?: (questionId: string) => Promise<void>;
}

export const QuestionList = ({ questions, onAnswerSubmit, onReject }: QuestionListProps) => {
  return (
    <>
      <h3 className="text-lg font-bold text-[#146C94] mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        Questions and discussion ({questions.length})
      </h3>

      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((q) => (
            <QuestionItem
              key={q.id}
              question={q}
              onAnswerSubmit={onAnswerSubmit}
              onReject={onReject}
            />
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-100">
            <p className="text-gray-400 text-sm">No questions have been posted for this auction yet.</p>
          </div>
        )}
      </div>
    </>
  );
};
