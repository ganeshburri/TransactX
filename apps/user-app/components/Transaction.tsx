import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

// Transaction Component
interface TransactionProps {
    type: 'incoming' | 'outgoing';
    name: string;
    date: string;
    amount: number;
}

export const Transaction = ({ type, name, date, amount }: TransactionProps) => {
    const isOutgoing = type === 'outgoing';

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${isOutgoing ? 'bg-red-50' : 'bg-green-50'}`}>
                    {isOutgoing ? (
                        <ArrowUpCircle className="w-6 h-6 text-red-500" />
                    ) : (
                        <ArrowDownCircle className="w-6 h-6 text-green-500" />
                    )}
                </div>
                <div>
                    <h3 className="font-medium text-gray-900">{name}</h3>
                    <p className="text-gray-500">{date}</p>
                </div>
            </div>
            <span className={`font-medium ${isOutgoing ? 'text-red-500' : 'text-green-500'}`}>
                {isOutgoing ? '- ' : '+ '}₹{amount.toLocaleString()}
            </span>
        </div>
    );
};