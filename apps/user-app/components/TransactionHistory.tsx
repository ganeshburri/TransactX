import { Transaction } from "./Transaction";

// Transaction History Component
export const TransactionHistory: React.FC = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <div className="divide-y divide-gray-100">
            <Transaction type="outgoing" name="Amazon" date="Today" amount={1299} />
            <Transaction type="incoming" name="Rahul Sharma" date="Yesterday" amount={2500} />
            <Transaction type="outgoing" name="Electricity" date="22 Apr" amount={875} />
        </div>
    </div>
);