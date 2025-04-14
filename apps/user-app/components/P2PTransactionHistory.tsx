import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

// Mock data - replace with actual data from your backend
const transactions = [
    {
        id: '1',
        amount: 500,
        timestamp: new Date('2024-04-14T11:11:00'),
        type: 'sent',
        otherParty: 'Bob',
    },
    {
        id: '2',
        amount: 1200,
        timestamp: new Date('2024-04-13T11:11:00'),
        type: 'received',
        otherParty: 'Charlie',
    },
    {
        id: '3',
        amount: 250,
        timestamp: new Date('2024-04-12T11:11:00'),
        type: 'sent',
        otherParty: 'Diana',
    },
];

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
    return `₹${amount.toLocaleString()}`;
}

// Transaction Item Component
function TransactionItem({ transaction }: { transaction: typeof transactions[0] }) {
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

// Main Component
export function P2PTransactionHistory() {
    return (
        <div className="w-full">
            <div className="mx-auto">
                <h1 className="text-2xl font-semibold text-blue-500 mb-8">P2P Transactions</h1>
                <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
                    {transactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
}