"use client"
import { useState,useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getBalance } from '../app/lib/actions/getBalance';

// Balance Card Component
export const Balance = () => {
    const router = useRouter();
    const [balance, setBalance] = useState<number>(0)

    useEffect(() => {
        getBalance()
            .then((res) =>{
                setBalance(res.amount/100)
            })
    }, [balance]);

    const handleClick = () => {
        router.push("/transfer");
    };

    return(
        <div className="bg-[#4F7DF3] text-white p-8 rounded-2xl">
            <p className="text-xl mb-2">Balance</p>
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-semibold">{balance.toLocaleString()}</h1>
                <button className="bg-white text-[#4F7DF3] px-4 py-2
                    rounded-lg flex items-center gap-2 font-medium hover:bg-gray-100"
                    onClick={handleClick}
                >
                    <PlusCircle className="w-5 h-5" />
                    Add Money
                </button>
            </div>
        </div>
    )
}