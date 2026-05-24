"use client";

import { useState } from "react";
import { Question } from "@/types/auction_type";
import { AnswerForm } from "./answer_form";

interface QuestionItemProps {
  question: Question;
  onRefreshData?: () => void; // Used to refresh data after replying
}

export const QuestionItem = ({ question, onRefreshData }: QuestionItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleAnswerSubmit = async (qId: string, answerText: string) => {
    // Real API call logic will go here
    console.log(`Send answer API for question ${qId}: ${answerText}`);
    
    // Simulate success
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setShowReplyForm(false);
        if (onRefreshData) onRefreshData();
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="space-y-3">
      {/* User question */}
      <div className="bg-[var(--background-color)] p-4 rounded-xl border border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-[var(--secondary-color)] font-bold text-xs">
              {question.user_name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{question.user_name}</p>
              <p className="text-[10px] text-gray-400">{question.created_at}</p>
            </div>
          </div>
          
          {!question.answer && (
            <button 
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs font-semibold text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
            >
              {showReplyForm ? "Cancel" : "Reply"}
            </button>
          )}
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{question.content}</p>

        {/* Inline reply form */}
        {showReplyForm && !question.answer && (
          <AnswerForm 
            questionId={question.id} 
            onSubmit={handleAnswerSubmit} 
          />
        )}
      </div>

      {/* Existing answer, if any */}
      {question.answer && (
        <div className="ml-8 border-l-2 border-[var(--accent-color)] pl-4 py-1">
          <div className="bg-white p-3 rounded-xl border border-blue-50">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold bg-[var(--secondary-color)] text-white px-1.5 py-0.5 rounded">
                SELLER
              </span>
              <p className="text-[10px] text-gray-400">{question.answer.replied_at}</p>
            </div>
            <p className="text-sm text-gray-600 italic">
              {question.answer.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};