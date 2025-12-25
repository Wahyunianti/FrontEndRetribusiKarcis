import React from 'react';

interface CardProps {
    title: string;
    description?: string;
    imageSrc?: string;
    onClick?: () => void;
    className?: string;
    extraText?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageSrc, onClick, className = '', extraText }) => {
    return (
        <div
            className={`bg-white h-full rounded-xl relative shadow-md overflow-hidden hover:shadow-lg drop-shadow-xl transition-shadow duration-300 cursor-pointer ${className}`}
            onClick={onClick} >
            {imageSrc && (
                <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                {description && (
                    <p className="text-gray-600 text-sm">{description}</p>
                )}
            </div>
            {extraText && (
                <div className="marquee text-xl absolute bottom-0 italic">
                    <span className="marquee-content">
                        <span className="marquee-item">
                            {extraText}
                            <img src="flag.gif" width={20} alt="" />
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default Card;
