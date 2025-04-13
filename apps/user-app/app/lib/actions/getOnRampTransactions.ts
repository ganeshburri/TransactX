"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

// Fetch user on-ramp transactions
export async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const transactions = await db.onRampTransaction.findMany({
        where: { userId }
    });
    
    return transactions.map(transaction => ({
        time: transaction.startTime,
        amount: transaction.amount,
        status: transaction.status,
        provider: transaction.provider
    }));
}