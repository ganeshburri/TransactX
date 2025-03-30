"use client";
import { useState } from "react";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/Card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    const handleNumberChange = (value: string) => {
        setNumber(value);
    };

    const handleAmountChange = (value: string) => {
        setAmount(value);
    };

    const handleSendClick = async() => {
        const msg = await p2pTransfer(number, Number(amount) * 100);
        console.log(msg);
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder="Enter Phone number"
                            label="Phone Number"
                            onChange={handleNumberChange}
                        />
                        <TextInput
                            placeholder="Enter Amount"
                            label="Amount"
                            onChange={handleAmountChange}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSendClick}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}