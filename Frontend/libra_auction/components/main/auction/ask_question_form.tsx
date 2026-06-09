"use client";

import { useState } from "react";
import { askAuctionQuestion } from "@/services/ask_auction_question";

interface AskQuestionFormProps {
  auctionId: string;
  onQuestionSubmitted?: () => void;
}

export default function AskQuestionForm({ auctionId, onQuestionSubmitted }: AskQuestionFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await askAuctionQuestion(auctionId, content.trim());
      setContent("");
      if (onQuestionSubmitted) {
        onQuestionSubmitted();
      }
    } catch {
      setError("Failed to submit question. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <label className="block text-sm font-semibold text-[#146C94] mb-2">
        Ask a question about this auction
      </label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your question here..."
        rows={3}
        className="w-full p-3 text-sm border border-[#AFD3E2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/30 focus:border-[#19A7CE] bg-white resize-none transition-all"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="rounded-xl bg-[#146C94] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d5a7a] disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
        >
          {isSubmitting ? "Submitting..." : "Submit Question"}
        </button>
      </div>
    </form>
  );
}
