import { fetchPublicAuctionQuestions } from "@/services/fetch_public_auction_questions";
import { AuctionQuestion } from "@/types/auction/auction_question";
import { DateFormat } from "@/utils/date_format";

export default async function AuctionQuestionsSection({ auctionId }: { auctionId: string }) {
  const questions: AuctionQuestion[] = await fetchPublicAuctionQuestions(auctionId);

  return (
    <div className="w-full bg-gray-50/50 px-16 pb-12">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions & Answers</h2>

        {questions.length > 0 ? (
          <div className="space-y-5">
            {questions.map((question) => (
              <div key={question.id} className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-800">{question.user_name}</p>
                    <p className="text-xs text-gray-400 mt-1">{DateFormat(question.created_at)}</p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Question
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-700">{question.content}</p>

                {question.answer ? (
                  <div className="mt-4 rounded-xl border border-emerald-100 bg-white p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Answered</p>
                      <p className="text-[10px] text-gray-400">{DateFormat(question.answer.replied_at)}</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{question.answer.content}</p>
                  </div>
                ) : (
                  <p className="mt-4 text-sm italic text-gray-400">No answer yet.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-10 text-center">
            <p className="text-sm text-gray-400">No questions have been posted for this auction yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}