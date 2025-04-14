"use client";
import { useState } from "react";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/Card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import axios from "axios";

const SUPPORTED_BANKS = [
    {
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com",
    },
    {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/",
    },
    {
        name: "Kotak Bank",
        redirectUrl: "https://www.kotak.com/",
    },
];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [amount, setAmount] = useState(0);

    const handleBankSelect = (value: string) => {
        const selectedBank = SUPPORTED_BANKS.find((bank) => bank.name === value);
        setRedirectUrl(selectedBank?.redirectUrl || "");
        setProvider(selectedBank?.name || "");
    };

    const handleAddMoneyClick = async() => {
        const { token, userId } = await createOnRampTransaction(provider,amount);
        //make a request to Bank webhook
        setTimeout(async()=> {
            try {
                const res = await axios.post(process.env.NEXT_PUBLIC_BANK_WEBHOOK_URL || "http://localhost:3003/hdfcwebhook",
                    {
                        token,
                        user_identifier: userId,
                        amount: amount * 100
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                console.log(res);
                window.location.href = redirectUrl || "";
            }
            catch(e) {
                console.log(e)
            }
        },2000);
    };

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput label="Amount" placeholder="Amount" onChange={(val) => {
                    setAmount(Number(val))
                }} />

                <div className="py-4 text-left">Bank</div>

                <Select
                    onSelect={handleBankSelect}
                    options={SUPPORTED_BANKS.map((bank) => ({
                        key: bank.name,
                        value: bank.name,
                    }))}
                />

                <div className="flex justify-center pt-4">
                    <Button onClick={handleAddMoneyClick}>Add Money</Button>
                </div>
            </div>
        </Card>
    );
};