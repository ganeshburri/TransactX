import db from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

// Helper function to fetch user session
async function getUserSession() {
    return await getServerSession(authOptions);
}

// Fetch user balance
async function getBalance(userId: string) {
    const balance = await db.balance.findFirst({
        where: { userId }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}

// Fetch user on-ramp transactions
async function getOnRampTransactions(userId: string) {
    const transactions = await db.onRampTransaction.findMany({
        where: { userId }
    });
    return transactions.map(transaction => ({
        time: transaction.startTime,
        amount: transaction.amount,
        status: transaction.status,
        provider: transaction.provider
    }));
}

// Main page component
export default async function TransferPage() {
    const session = await getUserSession();
    const userId = session?.user?.id;

    if (!userId) {
        // Handle unauthenticated state if necessary
        return <div>Please log in to view your transfer details.</div>;
    }

    const [balance, transactions] = await Promise.all([
        getBalance(userId),
        getOnRampTransactions(userId)
    ]);

    return (
        <div>
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    <AddMoney />
                </div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <div className="pt-4">
                        <OnRampTransactions transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}