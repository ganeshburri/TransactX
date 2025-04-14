"use server";
import db from "@repo/db/client";

export async function getUserTransactions(userId: string) {
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
        return [];
    }

    const allTransfers = [
        ...userWithTransfers.sentTransfers.map(t => ({ ...t, type: 'sent',otherParty: t.toUser?.name ?? 'Unknown' })),
        ...userWithTransfers.receivedTransfers.map(t => ({ ...t, type: 'received', otherParty: t.fromUser?.name ?? 'Unknown' })),
    ];

    allTransfers.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return allTransfers;
}