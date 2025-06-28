import type {ChangeEvent} from 'react';

interface InputProps {
    error?: boolean;
    errorTextMap?: string;
    value: string;
    name: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    id: string;
}

export default function Input({ error, errorTextMap, value, name, handleChange, id }: InputProps) {
    const inputType = id === 'password' || id === 'confirmPassword' ? 'password' : 'text';

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {name}
            </label>
            {error && errorTextMap && (
                <p className="text-red-500 text-xs mt-1">{errorTextMap}</p>
            )}
            <input
                type={inputType}
                id={id}
                name={id}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}