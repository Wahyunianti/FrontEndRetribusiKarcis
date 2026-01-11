import React from 'react';

interface CardProps {
  heigth?: string;
}

const LoadingPage: React.FC<CardProps> = ({ heigth = '' }) => {
  return (
    <div className={`flex items-center rounded-lg justify-center w-full ${heigth}`}>
      <div className="w-12 h-12 border-4 border-gray-200 border-t-lime-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingPage;
