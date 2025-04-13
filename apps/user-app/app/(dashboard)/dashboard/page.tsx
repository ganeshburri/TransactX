import React from 'react';
import { SendMoneyButton } from '../../../components/SendMoneyButton';
import { TransactionHistory } from '../../../components/TransactionHistory';
import { Balance } from '../../../components/Balance';


// Main App Component
export default function Home(){
    return(
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="mx-auto space-y-4">
                <Balance />
                <SendMoneyButton />
                <TransactionHistory />
            </div>
        </div>
    )
}