import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    //TODO: Check if onRampTransactions is processing or not
    const paymentInformation: {
        token: string;
        userId: string;
        amount: number
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: paymentInformation.amount
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        await db.onRampTransaction.update({
            where: {
                token: paymentInformation.token
            }, 
            data: {
                status: "Failure",
            }
        })
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003, () => {
    console.log(`Bank WebHook server is listening on Port ${3003}`);
}); 