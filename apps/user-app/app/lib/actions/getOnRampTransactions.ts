"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
import { timeStamp } from "console";

// Fetch user on-ramp transactions
export async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const transactions = await db.onRampTransaction.findMany({
        where: { userId }
    });
    
    return transactions.map(transaction => ({
        id: transaction.id,
        timestamp: transaction.startTime,
        amount: transaction.amount,
        status: transaction.status as string,
        provider: transaction.provider
    }));
}