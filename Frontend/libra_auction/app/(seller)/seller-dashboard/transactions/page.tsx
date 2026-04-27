import { TransactionList } from "@/components/seller/transaction/transaction_list";
import { mockTransactions } from "@/data/transaction";

export default function page() {
    return (
        <TransactionList transactions={mockTransactions} />
    );
}