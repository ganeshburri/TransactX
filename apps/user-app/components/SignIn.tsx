'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { signUp } from '../app/lib/actions/signUp';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const toggleMode = () => setIsSignUp(!isSignUp);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
            >
                <Header isSignUp={isSignUp} />
                <AuthForm isSignUp={isSignUp} />
                <ToggleMode isSignUp={isSignUp} toggleMode={toggleMode} />
            </motion.div>
        </div>
    );
}

function Header({ isSignUp }: { isSignUp: boolean }) {
    return (
        <h2 className="text-2xl font-bold text-center text-gray-800">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>
    );
}

function AuthForm({ isSignUp }: { isSignUp: boolean }) {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state before submission

        try {
            if (!isSignUp) {
                const res = await signIn("credentials", {
                    phone: phoneNumber,
                    password,
                });
                if (!res || res.error) {
                    setError('Invalid phone number or password.');
                }
            } else {
                const res = await signUp(username, phoneNumber, password);
                if (!res || res.error) {
                    setError(res.message || 'Failed to create an account. Please try again.');
                    return;
                }
                const response = await signIn("credentials", {
                    phone: res.phone,
                    password: password,
                });
                console.log(response);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
                <div className="text-red-600 text-sm text-center">
                    {error}
                </div>
            )}
            {isSignUp && (
                <InputField
                    label="Username"
                    type="text"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            )}
            <InputField
                label="Phone Number"
                type="number"
                placeholder="e.g. +1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <SubmitButton isSignUp={isSignUp} />
        </form>
    );
}

function InputField({
    label,
    type,
    placeholder,
    value,
    onChange,
}: {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-600">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>
    );
}

function SubmitButton({ isSignUp }: { isSignUp: boolean }) {
    return (
        <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow"
        >
            {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
    );
}

function ToggleMode({
    isSignUp,
    toggleMode,
}: {
    isSignUp: boolean;
    toggleMode: () => void;
}) {
    return (
        <p className="text-sm text-center text-gray-500">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={toggleMode} className="text-blue-600 hover:underline font-medium">
                {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
        </p>
    );
}