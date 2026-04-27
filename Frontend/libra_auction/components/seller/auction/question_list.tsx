"use client";
import { Question } from "@/types/auction_type";
import { QuestionItem } from "./question_item";

interface QuestionListProps {
  questions: Question[];
}

export const QuestionList = ({ questions }: QuestionListProps) => {
  return (
    <>
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        Câu hỏi và thảo luận ({questions.length})
      </h3>

      <div className="space-y-6">
        {questions.length > 0 ? (
          questions.map((q) => (
            <QuestionItem
              key={q.id}
              question={q}
            />
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-100">
            <p className="text-gray-400 text-sm">Chưa có câu hỏi nào cho phiên này.</p>
          </div>
        )}
      </div>
    </>
  );
};