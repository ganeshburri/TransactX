"use client";

interface SelectProps {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
}

export const Select: React.FC<SelectProps> = ({ options, onSelect }) => {
    return (
        <select
            onChange={(e) => onSelect(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 
            outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
            block w-full p-2.5"
        >
            {options.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
        </select>
    );
};