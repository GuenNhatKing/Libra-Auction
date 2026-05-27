export type TransactionStatus = 'SUCCESS' | 'PENDING' | 'FAILED';

export type Transaction = {
  id: string;
  status: TransactionStatus;
  participant_name: string;
  amount: number;
  created_at: string;
};
