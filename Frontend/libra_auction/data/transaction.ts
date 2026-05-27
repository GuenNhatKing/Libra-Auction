import { Transaction } from '@/types/transaction_type';

export const mockTransactions: Transaction[] = [
  {
    id: 'TX-1001',
    status: 'SUCCESS',
    participant_name: 'Nguyen Van A',
    amount: 1250000,
    created_at: '2026-05-26 09:20',
  },
  {
    id: 'TX-1002',
    status: 'PENDING',
    participant_name: 'Tran Thi B',
    amount: 860000,
    created_at: '2026-05-26 10:05',
  },
  {
    id: 'TX-1003',
    status: 'FAILED',
    participant_name: 'Le Van C',
    amount: 2450000,
    created_at: '2026-05-25 17:45',
  },
];
