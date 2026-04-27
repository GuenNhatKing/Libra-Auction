export type TransactionDetailData = {
  id: string;
  participant_name: string;
  auction_name: string;
  auction_id: string;
  amount: number;
  created_at: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  payment_method: string;
  transaction_hash?: string;
}