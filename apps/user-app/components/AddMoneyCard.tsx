"use client";
import { useState } from "react";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/Card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
    {
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com",
    },
    {
        name: "Axis Bank",
        redirectUrl: "https://www.axisbank.com/",
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
        await createOnRampTransaction(provider,amount);
        window.location.href = redirectUrl || "";
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