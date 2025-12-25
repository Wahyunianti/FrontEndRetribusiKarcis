import React from 'react';

interface ButtonProps {
    title: string;
    className?: string;
    imageSrc?: any;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, imageSrc, onClick, className }) => {
    return (
        <button onClick={onClick} className={`mt-4 h-min cursor-pointer 
  flex flex-row gap-2 items-center text-white font-bold py-2 px-4 rounded-lg 
  transition-all duration-300 ease-in-out 
  transform hover:scale-105 active:scale-95 ${className}`}>
            {title} {imageSrc}
        </button>
    );
};

export default Button;
