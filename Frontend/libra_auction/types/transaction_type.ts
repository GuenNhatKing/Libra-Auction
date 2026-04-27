export type Transaction = {
  id: string;
  participant_name: string;
  amount: number;
  created_at: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}