import { getOnRampTransactions } from "../app/lib/actions/getOnRampTransactions";
import { getUserTransactions } from "../app/lib/actions/getUserTransactions";
import { TransactionItem } from "./TransactionItem";


// Transaction History Component
export const TransactionHistory: React.FC = async() => {
    const transactions = await getUserTransactions();
    let onRampTransactions = await getOnRampTransactions();
    onRampTransactions = onRampTransactions.filter((t) => t.status === "Success");
    
    const allTransfers = [
        ...transactions,
        ...onRampTransactions.map(t => ({ ...t, type: 'received', otherParty: t.provider })),
    ];

    allTransfers.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    return(
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <div className="divide-y divide-gray-100">
            {allTransfers.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
        </div>
    </div>
    )
};