"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export async function getUserTransactions() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        throw new Error("User is not authenticated");
    }

    const userWithTransfers = await db.user.findUnique({
        where: { id: userId },
        include: {
            sentTransfers: {
                select: {
                    id: true,
                    amount: true,
                    timestamp: true,
                    toUser: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            receivedTransfers: {
                select: {
                    id: true,
                    amount: true,
                    timestamp: true,
                    fromUser: {
                        select: {
                            name: true
                        }
                    }
                }
            },
        },
    });

    if (!userWithTransfers) {
        throw new Error("User data not found");
    }

    const allTransfers = [
        ...userWithTransfers.sentTransfers.map(t => ({ ...t, type: 'sent',otherParty: t.toUser?.name ?? 'Unknown' })),
        ...userWithTransfers.receivedTransfers.map(t => ({ ...t, type: 'received', otherParty: t.fromUser?.name ?? 'Unknown' })),
    ];

    allTransfers.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return allTransfers;
}