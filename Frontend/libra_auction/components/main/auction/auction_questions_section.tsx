import { fetchPublicAuctionQuestions } from "@/services/fetch_public_auction_questions";
import { fetchAuctionQuestionsWithOwn } from "@/services/fetch_auction_questions_with_own";
import { AuctionQuestion } from "@/types/auction/auction_question";
import QuestionsListWrapper from "./questions_list_wrapper";

export default async function AuctionQuestionsSection({
  auctionId,
  isAuthenticated,
  currentUserId,
  isCreator,
  isAdmin,
  auctionStatus,
}: {
  auctionId: string;
  isAuthenticated: boolean;
  currentUserId: string | null;
  isCreator: boolean;
  isAdmin: boolean;
  auctionStatus: string;
}) {
  const questions: AuctionQuestion[] = isAuthenticated && currentUserId
    ? await fetchAuctionQuestionsWithOwn(auctionId)
    : await fetchPublicAuctionQuestions(auctionId);

  return (
    <div className="w-full bg-[#F8FCFD] px-16 pb-12">
      <div className="bg-white rounded-2xl border border-[#AFD3E2] shadow-sm p-8">
        <h2 className="text-2xl font-bold text-[#146C94] mb-6">Questions & Answers</h2>
        <QuestionsListWrapper
          auctionId={auctionId}
          initialQuestions={questions}
          isAuthenticated={isAuthenticated}
          currentUserId={currentUserId}
          isCreator={isCreator}
          isAdmin={isAdmin}
          auctionStatus={auctionStatus}
        />
      </div>
    </div>
  );
}
