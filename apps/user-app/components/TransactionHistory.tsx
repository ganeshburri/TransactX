import { getOnRampTransactions } from "../app/lib/actions/getOnRampTransactions";
import { getUserTransactions } from "../app/lib/actions/getUserTransactions";
import { TransactionItem } from "./TransactionItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";


// Transaction History Component
export const TransactionHistory: React.FC = async() => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if(!userId) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">History</h2>
                <div className="text-center pb-8 pt-8">
                    Please login to view history
                </div>
            </div>
        );
    }

    const transactions = await getUserTransactions(userId);
    let onRampTransactions = await getOnRampTransactions();
    onRampTransactions = onRampTransactions.filter((t) => t.status === "Success");
    
    const allTransfers = [
        ...transactions,
        ...onRampTransactions.map(t => ({ ...t, type: 'received', otherParty: t.provider })),
    ];

    allTransfers.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    if (!allTransfers.length) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">History</h2>
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </div>
        );
    }
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