import React from 'react';

interface ImageCardProps {
    imageSrc: string;
    onClick?: () => void;
    className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
    imageSrc,
    onClick,
    className = ''
}) => {
    return (
        <div className={`relative bg-white drop-shadow-xl overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}
            onClick={onClick}>
            <img
                src={imageSrc}
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default ImageCard;
