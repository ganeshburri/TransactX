import { OnRampStatus, PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function upsertUser(data: {
    phone_number: string;
    password: string;
    name: string;
    transaction: {
        startTime: Date;
        status: OnRampStatus;
        amount: number;
        token: string;
        provider: string;
    };
}) {
    return prisma.user.upsert({
        where: { phone_number: data.phone_number },
        update: {},
        create: {
            phone_number: data.phone_number,
            password: await bcrypt.hash(data.password,10),
            name: data.name,
            Balance: {
                create: {
                    amount: 20000,
                    locked: 0
                }
            },
            OnRampTransaction: {
                create: data.transaction,
            },
        },
    });
}

async function main() {
    const user1 = await upsertUser({
        phone_number: '1234567890',
        password: 'varma',
        name: 'varma',
        transaction: {
            startTime: new Date(),
            status: 'Success',
            amount: 20000,
            token: '122',
            provider: 'Axis Bank',
        },
    });

    const user2 = await upsertUser({
        phone_number: '1234567800',
        password: 'ganesh',
        name: 'ganesh',
        transaction: {
            startTime: new Date(),
            status: 'Failure',
            amount: 2000,
            token: '123',
            provider: 'HDFC Bank',
        },
    });

    console.log({ user1, user2 });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });