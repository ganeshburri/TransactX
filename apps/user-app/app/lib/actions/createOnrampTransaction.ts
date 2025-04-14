"use server";

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { v4 as uuid } from 'uuid';

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token: string = uuid();
    await db.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: userId,
            amount: amount * 100
        }
    });

    return {
        message: "success",
        userId,
        token
    }
}
