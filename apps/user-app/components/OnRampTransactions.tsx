import { Card } from "@repo/ui/Card";

interface OnRampTransactionsProps{
    timestamp: Date,
    amount: number,
    status: string,
    provider: string
}

export const OnRampTransactions = ({ transactions }: { transactions: OnRampTransactionsProps[]; }) => {

    if (!transactions.length) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">No Recent transactions</div>
            </Card>
        );
    }

    return (
        <Card title="Recent Transactions">
            <div className="pt-2">
                {transactions.map((t) => (
                    <div className="flex justify-between" key={t.timestamp.toISOString()}>
                        <div>
                            <div className="text-sm">INR</div>
                            <div className="text-slate-600 text-xs">
                                {t.timestamp.toDateString()}
                            </div>
                            <div className="text-slate-600 text-xs">
                                {t.status}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};