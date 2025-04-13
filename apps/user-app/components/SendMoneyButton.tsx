"use client"
import { SendIcon } from 'lucide-react';
import { useRouter } from 'next/navigation'

// Send Money Button Component
export const SendMoneyButton = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/p2p");
    };

    return(
        <button className="w-full bg-white hover:bg-blue-50 shadow-sm
            border border-blue-200 py-4 rounded-xl flex 
            items-center justify-center gap-2 font-medium 
            text-gray-900" onClick={handleClick}
        >
            <SendIcon className="w-5 h-5" />
            Send Money
        </button>
    )
};