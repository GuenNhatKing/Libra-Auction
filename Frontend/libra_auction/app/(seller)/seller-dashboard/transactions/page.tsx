import { redirect } from "next/navigation";
import { getIdFromToken } from "@/lib/get_id_from_token";
import { fetchSellerTransactionHistory, UserTransactionResponse } from "@/services/fetch_transaction_history";
import { TransactionList } from "@/components/seller/transaction/transaction_list";
import { Transaction } from "@/types/transaction_type";

function toTransaction(transaction: UserTransactionResponse): Transaction {
  return {
    id: transaction.transactionId,
    status: transaction.status,
    participant_name: transaction.incoming ? "Buyer payment" : "Your payment",
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

  const transactions = (await fetchSellerTransactionHistory(userId)).map(toTransaction);

  return <TransactionList transactions={transactions} detailsHrefPrefix="/seller-dashboard/transactions" />;
}
