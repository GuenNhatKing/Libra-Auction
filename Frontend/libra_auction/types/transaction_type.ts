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

export type TransactionFilterFields = {
  searchTerm: string;
  participantName: string;
  status: string;
  transactionType: string;
  direction: string;
  minAmount: string;
  maxAmount: string;
};

export const defaultTransactionFilters: TransactionFilterFields = {
  searchTerm: "",
  participantName: "",
  status: "ALL",
  transactionType: "ALL",
  direction: "ALL",
  minAmount: "",
  maxAmount: "",
};
