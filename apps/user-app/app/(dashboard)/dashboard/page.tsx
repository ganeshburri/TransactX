import { SendMoneyButton } from '../../../components/SendMoneyButton';
import { TransactionHistory } from '../../../components/TransactionHistory';
import { Balance } from '../../../components/Balance';
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

// Main App Component
export default async function Home(){
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    
    if(!userId) {
        return(
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="mx-auto space-y-4">
                    Please login
                </div>
            </div>
        )
    }

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