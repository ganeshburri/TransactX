"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

// Main Function: Handles P2P Transfer
export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
        return { message: "Error while sending" };
    }

    const toUser = await findUserByNumber(to);
    if (!toUser) {
        return { message: "User not found" };
    }

    try {
        const res = await performTransaction(from, toUser.id, amount);
        return { message: res.message };
    } catch (error) {
        return handleError(error);
    }
}

// Helper Function: Find User by Phone Number
async function findUserByNumber(number: string) {
    return db.user.findFirst({
        where: { phone_number: number },
    });
}

// Helper Function: Perform Transaction
async function performTransaction(fromId: string, toId: string, amount: number) {
    try {
        await db.$transaction(async (tx) => {
            // Lock the row for the sender's balance
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${fromId} FOR UPDATE`;

            const fromBalance = await tx.balance.findUnique({
                where: { userId: fromId },
            });

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient Funds");
            }

            // Deduct amount from sender's balance
            await tx.balance.update({
                where: { userId: fromId },
                data: { amount: { decrement: amount } },
            });

            // Add amount to recipient's balance
            await tx.balance.update({
                where: { userId: toId },
                data: { amount: { increment: amount } },
            });

            //to track p2p transfers
            await tx.p2pTransfer.create({
                data: {
                    fromUserId: fromId,
                    toUserId: toId,
                    amount,
                    timestamp: new Date(),
                }
            })
        });

        return { message: "Transaction Successful" };
    } catch (error) {
        return handleError(error);
    }
}

// Utility Function: Handle Errors
function handleError(error: unknown) {
    if (error instanceof Error) {
        return { message: error.message };
    }
    return { message: "An unknown error occurred" };
}