import { TransactionStatus } from '@/types/transaction_type';

export type TransactionDetailData = {
  id: string;
  auction_id: string;
  auction_name: string;
  participant_name: string;
  amount: number;
  created_at: string;
  payment_method: string;
  transaction_hash?: string;
  status: TransactionStatus;
};
