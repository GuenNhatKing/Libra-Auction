"use client";

import { useState } from "react";

interface AnswerFormProps {
  questionId: string;
  onSubmit: (questionId: string, answer: string) => Promise<void>;
}

export const AnswerForm = ({ questionId, onSubmit }: AnswerFormProps) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Simulated API delay
      await onSubmit(questionId, answer);
      setAnswer(""); // Clear input after success
    } catch (error) {
      console.error("Error sending answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-2">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer..."
        className="w-full p-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--primary-color) bg-white min-h-20 transition-all resize-none"
      />
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!answer.trim() || isSubmitting}
          className="bg-(--secondary-color) hover:bg-(--primary-color) disabled:bg-gray-300 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all active:scale-95 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Sending...
            </>
          ) : (
            "Reply"
          )}
        </button>
      </div>
    </form>
  );
};