"use client";

interface TextInputProps {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
}

export const TextInput: React.FC<TextInputProps & { type?: string; min?: number }> = ({ placeholder, onChange, label, type = "text", min }) => {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                type={type}
                min={min}
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};