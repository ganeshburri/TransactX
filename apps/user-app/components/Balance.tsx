import { PlusCircle } from 'lucide-react';

// Balance Card Component
export const Balance: React.FC = () => (
    <div className="bg-[#4F7DF3] text-white p-8 rounded-2xl">
        <p className="text-xl mb-2">Balance</p>
        <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">₹24,500</h1>
            <button className="bg-white text-[#4F7DF3] px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
                <PlusCircle className="w-5 h-5" />
                Add Money
            </button>
        </div>
    </div>
);