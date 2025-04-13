"use server";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

// Fetch user balance
export async function getBalance() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const balance = await db.balance.findFirst({
        where: { userId }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}