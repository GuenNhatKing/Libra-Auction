export type TransactionStatus = 'SUCCESS' | 'PROCESSING' | 'REFUNDED' | 'CANCELLED' | 'FAILED';

export type Transaction = {
  id: string;
  status: TransactionStatus;
  participant_name: string;
  amount: number;
  created_at: string;
  transaction_type?: 'DEPOSIT' | 'PAYMENT';
  direction?: 'INCOMING' | 'OUTGOING';
  description?: string;
};
