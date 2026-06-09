export type AuctionQuestionAnswer = {
  content: string;
  replied_at: string;
};

export type SellerQuestionStatus = 'UNANSWERED' | 'ANSWERED' | 'ANSWER_REJECTED';

export type AuctionQuestion = {
  id: string;
  user_id: string | null;
  user_name: string;
  avatar_url: string | null;
  content: string;
  created_at: string;
  answer: AuctionQuestionAnswer | null;
  question_status: SellerQuestionStatus;
};
