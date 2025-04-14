import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface transactionProps{
        id: string
        amount: number,
        timestamp: Date,
        type: string,
        otherParty: string,
}

// Transaction Item Component
export function TransactionItem({ transaction }: { transaction: transactionProps}) {
    const isReceived = transaction.type === 'received';

    return (
        <div className="p-4 hover:bg-gray-50  transition-colors">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isReceived ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}
                    >
                        {isReceived ? (
                            <ArrowDownLeft className="w-5 h-5" />
                        ) : (
                            <ArrowUpRight className="w-5 h-5" />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{transaction.otherParty}</p>
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                    isReceived ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}
                            >
                                {isReceived ? 'Received' : 'Sent'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(transaction.timestamp)}</p>
                    </div>
                </div>
                <span className={`font-medium ${isReceived ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {isReceived ? '+' : '-'}
                    {formatAmount(transaction.amount)}
                </span>
            </div>
        </div>
    );
}

// Utility functions
function formatDate(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    if (days === 0) {
        return `Today, ${time}`;
    } else if (days === 1) {
        return `Yesterday, ${time}`;
    } else if (days < 7) {
        return `${days} days ago, ${time}`;
    }

    return `${date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}, ${time}`;
}

function formatAmount(amount: number) {
    return `₹${(amount/100).toLocaleString()}`;
}