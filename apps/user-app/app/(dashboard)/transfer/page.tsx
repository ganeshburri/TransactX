import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getBalance } from "../../lib/actions/getBalance";
import { getOnRampTransactions } from "../../lib/actions/getOnRampTransactions";

// Main page component
export default async function TransferPage() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        // Handle unauthenticated state if necessary
        return <div>Please log in to view your transfer details.</div>;
    }

    const [balance, transactions] = await Promise.all([
        getBalance(),
        getOnRampTransactions()
    ]);

    return (
        <div>
            <div className="text-2xl text-[#4F7DF3] pt-8 mb-8 mx-5 font-bold">
                Add Money
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