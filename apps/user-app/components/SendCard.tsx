'use client';
import { useState } from 'react';
import { Phone, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { p2pTransfer } from '../app/lib/actions/p2pTransfer'; //server action

export function SendCard() {
    const [mobile, setMobile] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [responseMsg, setResponseMsg] = useState<{ message?: string; receiverName?: string }>({});

    const [errors, setErrors] = useState<{ mobile?: string; amount?: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        const newErrors: typeof errors = {};

        if (!/^\d{10,15}$/.test(mobile)) {
            newErrors.mobile = 'Enter a valid mobile number';
        }
        
        const parsedAmount = parseFloat(amount);
        if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await p2pTransfer(mobile, Math.round(parsedAmount * 100));
            setResponseMsg({ message: response.message, receiverName: response.receiverName});
            setSuccess(response.message === 'Transaction Successful');
        } catch (error) {
            setSuccess(false);
            setResponseMsg({ message: "Something went wrong!" });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setMobile('');
        setAmount('');
        setSuccess(null);
        setResponseMsg({});
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-500 text-center mb-6">P2P Transfer</h1>

                {success !== null ? (
                    <div className="text-center space-y-4">
                        <h2
                            className={`text-xl font-semibold ${
                                success ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
                            {success ? 'Transfer Successful' : 'Transfer Failed'}
                        </h2>
                        <p className="text-gray-600">{responseMsg.message}</p>
                        {success ? (
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        ) : (
                            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                        )}
                        {success && (
                            <div className="text-left">
                                <div className="pb-2">
                                    <p className="text-gray-500">Recipient</p>
                                    <p className="text-md font-bold">{responseMsg.receiverName}</p>
                                </div>
                                <div className="pb-2">
                                    <p className="text-gray-500">Mobile Number</p>
                                    <p className="text-md font-bold">{mobile}</p>
                                </div>
                                <div className="pb-2">
                                    <p className="text-gray-500">Amount</p>
                                    <p className="text-md font-bold">${amount}</p>
                                </div>
                            </div>
                        )}
                        <button
                            onClick={resetForm}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            {success ? 'Send Another Payment' : 'Try Again'}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <h2 className="text-xl font-semibold">Transfer Money</h2>
                            <p className="text-gray-500">
                                Send money to anyone using their mobile number
                            </p>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Mobile Number</label>
                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                <input
                                    type="number"
                                    className="flex-1 outline-none"
                                    placeholder="Enter recipient's mobile number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                            </div>
                            {errors.mobile && (
                                <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
                            )}
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Amount</label>
                            <div className="flex items-center border rounded-lg px-3 py-2">
                                <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                                <input
                                    type="number"
                                    className="flex-1 outline-none"
                                    placeholder="Enter amount to send"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            {errors.amount && (
                                <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-lg text-white font-semibold ${
                                loading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {loading ? 'Processing…' : 'Send Money →'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}