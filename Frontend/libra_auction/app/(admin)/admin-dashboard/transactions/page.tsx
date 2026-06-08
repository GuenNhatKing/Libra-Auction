import { redirect } from "next/navigation";
import { fetchAdminTransactionHistory, UserTransactionResponse } from "@/services/fetch_transaction_history";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { TransactionList } from "@/components/seller/transaction/transaction_list";
import { Transaction } from "@/types/transaction_type";

function toTransaction(transaction: UserTransactionResponse): Transaction {
  return {
    id: transaction.transactionId,
    status: transaction.status,
    participant_name: transaction.transactionType === "PAYMENT" ? "Winner payment" : "Deposit",
    amount: transaction.amount,
    created_at: transaction.createdAt,
    transaction_type: transaction.transactionType,
    direction: transaction.incoming ? "INCOMING" : "OUTGOING",
    description: transaction.description,
  };
}

export default async function Page() {
  const userId = await getIdFromToken();
  if (!userId) {
    redirect("/sign-in");
  }

  const transactions = (await fetchAdminTransactionHistory()).map(toTransaction);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-sm text-gray-500">Review deposit and winner payment transactions.</p>
      </div>
      <TransactionList transactions={transactions} />
    </div>
  );
}
