import React from 'react';
import { TransactionItem } from './TransactionItem';
import { getUserTransactions } from '../app/lib/actions/getUserTransactions';
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

// Main Component
export async function P2PTransactionHistory() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    if(!userId) {
        return (
            <div className="mx-auto">
                <h1 className="text-2xl font-semibold text-blue-500 mb-8">P2P Transactions</h1>
                <div className="text-center pb-8 pt-8">
                    Please login to view history
                </div>
            </div>
        );
    }

    const transactions = await getUserTransactions(userId);
    
    if (!transactions.length) {
            return (
                <div className="mx-auto">
                    <h1 className="text-2xl font-semibold text-blue-500 mb-8">P2P Transactions</h1>
                    <div className="text-center pb-8 pt-8">
                        No Recent transactions
                    </div>
                </div>
            );
    }

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