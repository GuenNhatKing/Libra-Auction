export type AuctionQuestionAnswer = {
    content: string;
    replied_at: string;
};

export type AuctionQuestion = {
    id: string;
    user_name: string;
    content: string;
    created_at: string;
    answer: AuctionQuestionAnswer | null;
};