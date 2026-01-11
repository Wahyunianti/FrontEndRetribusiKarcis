import React from 'react';

interface InputProps {
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange, type, className }) => {
    return (
        <input
            className={`${className || ''} hover:border-[#65a30d]
      w-full rounded-md border border-gray-200
      bg-white px-4 py-2 sm:py-3
      text-gray-900 text-sm
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-lime-600
      transition-all duration-200`}
            type={type || "text"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;
