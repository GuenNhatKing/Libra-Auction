import { Transaction } from "@/types/transaction_type";

// Mock data cho giao dịch
export const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    participant_name: "Alice Nguyen",
    amount: 1500000,
    created_at: "2024-06-01 10:30:00",
    status: "SUCCESS"
    },
    {
    id: "txn_002",
    participant_name: "Bob Tran",
    amount: 2500000,
    created_at: "2024-06-02 14:45:00",
    status: "PENDING"
  }
];